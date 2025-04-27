// src/pages/Blog.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const files = [1, 2, 3, 4];
      const loaded = await Promise.all(
        files.map(async (id) => {
          const file = await import(`../posts/${id}.md`);
          const res = await fetch(file.default);
          const text = await res.text();
          const { data } = matter(text);
          return { id, ...data };
        })
      );
      setPosts(loaded);
    }
    loadPosts();
  }, []);

  return (
    <div className="min-h-[80vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
