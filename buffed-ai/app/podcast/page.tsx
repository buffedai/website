import Link from 'next/link';

export default function Podcast() {
  const episodes = [
    { id: 1, title: 'Episode 1', summary: 'Episode 1 summary.', date: 'April 2, 2025' },
    { id: 2, title: 'Episode 2', summary: 'Episode 2 summary.', date: 'April 6, 2025' }
  ];
  
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Podcast Episodes</h1>
      <div className="grid grid-cols-1 gap-6">
        {episodes.map((episode) => (
          <div key={episode.id} className="p-6 border rounded-lg shadow hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold">{episode.title}</h2>
            <p className="mt-2 text-gray-700">{episode.summary}</p>
            <p className="mt-2 text-sm text-gray-500">{episode.date}</p>
            <Link href={`/podcast/${episode.id}`}>
              <a className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Listen More &gt;</a>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}