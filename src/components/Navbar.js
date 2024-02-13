// src/components/Navbar.js
"use client"
import React from 'react';
import Link from 'next/link';
import styles from '../app/home.module.css';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const Navbar = () => {
  return (
    <>
      <header>
        <div className={styles['menu-1']}>
          <div className={styles['header-logo']}>
            <a href="#" className={styles['nav-brand']}>
              <span>FS</span>
            </a>
          </div>

          <div className={styles['header-menu']}>
            <Link href="/">Home</Link>
            <Link href="/users">Users</Link>
          </div>
        </div>
        <div className={styles['header-menu']}>
          <a href="#!">Login</a>
          <a href="#!" className={styles['signup']}>Create an account</a>
        </div>
        <div className={styles['menu-2']} id="mobile-nav-btn">
          <img src="https://rvs-yelpcamp.vercel.app/Assets/Hamburger Menu.svg" alt="" />
        </div>
      </header>
    </>

  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
    </QueryClientProvider>
  );
};

export default App;
