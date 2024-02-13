// src/components/PostList.js
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import styles from '../app/home.module.css';

const fetchPosts = async () => {
  const res = await axios.get(`https://gorest.co.in/public-api/posts?page=1&per_page=10`);
  // const res = await axios.get(`https://gorest.co.in/public/v2/posts?page=1&per_page=10`);
  return res.data.data;
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const PostList = () => {
  const { data, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Articles</h2>
      
      <section className={styles['section-main']}>
        <div className={styles['articles']}>
          {data.map((post) => (
            <div key={post.id} className={styles['article']}>
              <div className={styles['article-img']}>
                <img src="https://images3.alphacoders.com/133/1338701.png" alt="" />
              </div>
              <div className={styles['article-title']}>
                <h5>{post.title}</h5>
              </div>
              <div className={styles['article-desc']}>
                <p>{truncateText(post.body, 125)}</p>
              </div>
              <div className={styles['article-link']}>
                <Link href={`/posts/${post.id}`}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
    
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
};

export default App;
