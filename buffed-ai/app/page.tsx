import ChatWidget from './components/ChatWidget';
import Link from 'next/link';

export default function Home() {
  // Sample blog posts data – ideally fetched via API
  const posts = [
    { id: 1, title: 'Post One', summary: 'This is the summary for post one.', date: 'April 1, 2025' },
    { id: 2, title: 'Post Two', summary: 'This is a summary for post two.', date: 'April 5, 2025' }
  ];
  
  // Sample podcast episodes data – ideally fetched via API
  const episodes = [
    { id: 1, title: 'Episode 1', summary: 'Episode 1 summary.', date: 'April 2, 2025' },
    { id: 2, title: 'Episode 2', summary: 'Episode 2 summary.', date: 'April 6, 2025' }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Buffed AI</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
          AI agents &amp; automation delivered at the speed of your ideas.
        </p>
      </section>

      {/* Chat Demo */}
      <section className="py-12" id="chat-demo">
        <h2 className="text-3xl font-bold text-center mb-8">Try the Assistant</h2>
        <ChatWidget />
      </section>

      {/* Blog Posts Preview */}
      <section className="py-12" id="blog-posts">
        <h2 className="text-4xl font-bold mb-8 text-center">Blog Posts</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 border rounded-lg shadow hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">{post.summary}</p>
              <p className="mt-2 text-sm text-gray-500">{post.date}</p>
              <Link 
                href={`/blog/${post.id}`}
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
              >
                Read More &gt;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Podcast Episodes Preview */}
      <section className="py-12" id="podcast-episodes">
        <h2 className="text-4xl font-bold mb-8 text-center">Podcast Episodes</h2>
        <div className="grid grid-cols-1 gap-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="p-6 border rounded-lg shadow hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold">{episode.title}</h2>
              <p className="mt-2 text-gray-700">{episode.summary}</p>
              <p className="mt-2 text-sm text-gray-500">{episode.date}</p>
              <Link 
                href={`/podcast/${episode.id}`}
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
              >
                Listen More &gt;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}