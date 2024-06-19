"use client";

import React, { useState, FormEvent } from "react";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";


const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e: FormEvent<HTMLFormElement>, action: 'login' | 'register') => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(username)) {
      setError('Please enter a valid email address.');
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    try {
      let url = 'https://ecombackend-production-6b46.up.railway.app/api/auth/register';
      let method = 'POST';

      if (action === 'login') {
        url = 'https://ecombackend-production-6b46.up.railway.app/api/auth/login';
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); // Set the user in the global state

        // Navigate to the home page after successful login
        window.location.href = '/';
      } else {
        setError('Username or password incorrect.');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="lg:px-20 sm:px-6">
      <div className="min-h-screen flex items-center justify-center bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
          <Link href="/">
            <div className="transition-transform transform hover:scale-110">
              <Image
              className="mx-auto h-12 w-auto"
              src="https://mindythelion.com/wp-content/uploads/2016/09/walmart-logo-png-6.png"
              alt="Walmart"
              width={48}
              height={48}
              />
            </div>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in or create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Not sure if you have an account? Enter your email and we&apos;ll check for you.
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              const action = (document.activeElement as HTMLButtonElement).value;
              handleLogin(e, action as 'login' | 'register');
            }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Email Address
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
                <span className="ml-2 cursor-pointer" onClick={clearError}>
                  &#x2715;
                </span>
              </div>
            )}

            <div>
              <button
                type="submit"
                value="login"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>

            <div>
              <button
                type="submit"
                value="register"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            <p>Securing your personal information is our priority.</p>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              See our privacy measures.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
