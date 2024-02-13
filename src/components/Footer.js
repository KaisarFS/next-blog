

// src/components/Navbar.js
"use client"
import React from 'react';
import Link from 'next/link';
import styles from '../app/home.module.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles['footer-logo']}>
            <a href="#" className={styles['nav-brand']}>
              <span>FS</span>
            </a>
          <p>Created by - <Link href="https://github.com/KaisarFS" target="_blank"><span>KaisarFS</span></Link></p>
        </div>
      </footer>
    </>

  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
