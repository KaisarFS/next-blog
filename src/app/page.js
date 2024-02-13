// src/app/page.js
'use client'
import Link from 'next/link';
import styles from './home.module.css';
import React from 'react';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className={styles['search-page']}>
      <Navbar />

      {/* <nav id="mobile-nav">
          <ul>
            <li><a href="#!">Home</a></li>
            <li><a href="#!">Login</a></li>
            <li><a href="#!" className={styles['signup']}>Create an account</a></li>
          </ul>
        </nav> */}

      <section className={styles['main']}>
        <section className={styles['section-header']}>
          <div>
            <h1>Hi, I'm Kaisar. <br />I help people build engaging &amp; responsive <strong>digital experiences</strong>.</h1>
            <Link className="btn btn-lg btn-dark" href="https://www.linkedin.com/in/kaisarfs/" target="_blank">Find out more</Link>
          </div>
        </section>

        <PostList />
      </section>
      <Footer />
    </main>
  );
}
