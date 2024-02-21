// src/app/posts/[id]/page.js
"use client"
import Link from "next/link";
import styles from "./detail.module.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useQuery } from "react-query";
// import Navbar from '../../../components/Navbar'


const fetchPost = async (id) => {
  const res = await axios.get(`https://gorest.co.in/public-api/posts/${id}`);
  return res.data.data;
};

const fetchComments = async (id) => {
  const res = await axios.get(`https://gorest.co.in/public-api/posts/${id}/comments`);
  return res.data.data;
};

export default function PostDetails({ params }) {
  const id = params.id;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      fetchPost(id).then((postData) => {
        setPost(postData);
        fetchComments(id).then((commentsData) => setComments(commentsData));
      });
    }
  }, [id]);

  if (post === null) {
    return <p>Loading...</p>;
  }

  if (comments === null) {
    return <p>Error!</p>;
  }


  return (
    <main className={styles['search-page']}>
      {/* <Navbar/> */}
      {/* <nav id="mobile-nav">
          <ul>
            <li><a href="#!">Home</a></li>
            <li><a href="#!">Login</a></li>
            <li><a href="#!" className={styles['signup']}>Create an account</a></li>
          </ul>
        </nav> */}
      <section className={styles['main']}>
        <div className={styles['wrapper']}>
          <div className={styles['scroll-indicator']} />
          <div className={styles['content-wrapper']}>
            <div className={styles['content']}>
              <div className={styles['poster']}>
                <div className={styles['poster-title']}>
                  <h1> {post.title} </h1>
                  <div className={styles['line']} />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto temporibus iste nostrum dolorem natus recusandae</p>
                </div>
                <div className={styles['poster-buttons']}>
                  <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div>
                  <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg></div>
                  <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg></div>
                </div>
              </div>
              <div className={styles['info']}>
                <div className={styles['block']}>
                  <div className={styles['mini-title']}>Published</div>
                  12.09.2022
                </div>
                <div className={styles['block']}>
                  <div className={styles['mini-title']}>Views</div>
                  3 251
                </div>
                <div className={styles['block']}>
                  <div className={styles['mini-title']}>Likes</div>
                  156
                </div>
                <div className={styles['block']}>
                  <div className={styles['mini-title']}>Reading</div>
                  12 min
                </div>
              </div>
              <div className={styles['words']}>
                <p>
                  <font className={styles['letter']}>{post.body[0]}</font>
                  {post.body}
                </p>
                <div className={styles['buttons']}>
                  <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div>
                  <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg></div>
                </div>
              </div>


            </div>
          </div>
          <div className={styles['footer']}>
            <div className={styles['content']}>
              <div className={styles['comments']}>
                <h2>Comments</h2>
                {comments.length === 0 ? (
                  <p>No Comments yet</p>
                ) : (
                  comments.map(comment => (
                    <div className={styles['comment-wrap']} key={comment.id}>
                      <div className={styles.photo}>
                        <div className={styles.avatar} style={{ backgroundImage: 'url("https://cdn.discordapp.com/attachments/1096243658086432858/1204285792483156038/rn_image_picker_lib_temp_2328c1d6-0e5f-40d7-810d-f4635c37369b.jpg?ex=65d42d8b&is=65c1b88b&hm=703a4441ddd39f10c5e6ac71cc61de4936ecfe923f7a2c3db5abfe15f35c79ff&")' }} />
                      </div>
                      <div className={styles['comment-block']}>
                        <div className={styles['comment-tile']}>{comment.name}</div>
                        <p className={styles['comment-text']}>{comment.body}</p>
                        <div className={styles['bottom-comment']}>
                          <div className={styles['comment-date']}>Feb 11, 2024 @ 10:32 AM</div>
                          <div className={styles['comment-actions']}>
                            <div><svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles['poster-button']}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

