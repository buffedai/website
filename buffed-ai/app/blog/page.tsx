import Link from 'next/link';

export default function Blog() {
  const posts = [
    { id: 1, title: 'Post One', summary: 'This is the summary for post one.', date: 'April 1, 2025' },
    { id: 2, title: 'Post Two', summary: 'This is a summary for post two.', date: 'April 5, 2025' }
  ];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 border rounded-lg shadow hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
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
    </main>
  );
}