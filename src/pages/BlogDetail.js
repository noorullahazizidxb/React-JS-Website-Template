// src/pages/BlogDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Buffer } from 'buffer';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


const BlogDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function loadPost() {
      try {
        const file = await import(`../posts/${id}.md`);
        const res = await fetch(file.default);
        const text = await res.text();
        window.Buffer = Buffer;
        const { data, content } = matter(text);
        setTitle(data.title);
        setContent(content);
      } catch (e) {
        setContent('Post not found.');
      }
    }
    loadPost();
  }, [id]);

  return (
    <div className="min-h-[80vh] py-20 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{title}</h1>
        <div className="prose dark:prose-invert max-w-3xl mx-auto">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            />
            </div>
      </div>
    </div>
  );
};

export default BlogDetail;
