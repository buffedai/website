'use client';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Auto-scroll to the bottom whenever messages update.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Remove HTML tags and markdown characters.
  const stripHtml = (raw: string) => {
    const noHtml = raw.replace(/<[^>]*>?/gm, '');
    return noHtml.replace(/[*_~`]+/gm, '').trim();
  };

  // Initialize Speech Recognition.
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setListening(false);
      };
      recognitionRef.current.onend = () => {
        setListening(false);
      };
    } else {
      alert('Speech Recognition API not supported in this browser.');
    }
  };

  // Start voice-to-text.
  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  // Stop text-to-speech.
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  async function send() {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages })
    });

    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistantOutput = '';

    // Process each stream chunk.
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk string.
      const chunk = decoder.decode(value, { stream: true });
      // Split into lines (each line should be a JSON string).
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const delta = parsed?.choices?.[0]?.delta;
          if (delta && delta.content) {
            assistantOutput += delta.content;
          }
        } catch (e) {
          console.error('Error parsing JSON chunk', e);
        }
      }
      // Clean the accumulated text.
      const cleanText = stripHtml(assistantOutput);
      setMessages(prev => {
        if (prev.length && prev[prev.length - 1].role === 'assistant') {
          return [...prev.slice(0, -1), { role: 'assistant', content: cleanText }];
        }
        return [...prev, { role: 'assistant', content: cleanText }];
      });
    }

    // Use the Web Speech API to speak the final plain text answer.
    if ('speechSynthesis' in window) {
      const cleanText = stripHtml(assistantOutput);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setSpeaking(false);
      };
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Chat display area */}
      <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg overflow-y-auto h-96">
        {messages.map((msg, i) => (
          <div key={i} className={clsx(
            "max-w-[75%] p-3 rounded-xl",
            msg.role === 'user' 
              ? "bg-blue-600 text-white self-end rounded-br-none" 
              : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
          )}>
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Buffed AI…"
        />
        <div className="flex gap-2">
          <button
            onClick={send}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Send
          </button>
          <button
            onClick={startVoiceInput}
            className={clsx(
              "flex-1 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition",
              { "opacity-50": listening }
            )}
            disabled={listening}
          >
            {listening ? 'Listening…' : 'Voice Input'}
          </button>
          <button
            onClick={stopSpeech}
            className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
            disabled={!speaking}
          >
            Stop Speech
          </button>
        </div>
      </div>
    </div>
  );
}