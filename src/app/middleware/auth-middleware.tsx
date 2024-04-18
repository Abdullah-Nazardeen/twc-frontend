"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UseAuth = () => {
  const router = useRouter();
  const { pathname } = window.location;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      const token = localStorage.getItem('twc-token');
      const isFirstContact = localStorage.getItem("is-first-contact");

      if (!token && pathname !== '/login') {
        router.push('/login');
      }

      if (token && pathname === '/login') {
        router.push('/');
      }

      if (isFirstContact && pathname === '/') {
        router.push('/contacts');
      }
    }
  }, []);

  return null; 
};

export default UseAuth;
