"use client"
import api from "@/utils/api";
import { useState } from "react";


export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await api.post('/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setError('');
      window.location.href = '/chat';  // Redirect to chat page
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1>Welcome to Chat App</h1>
      <form onSubmit={handleLogin}>
        <input className="my-2 p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input className="my-2 p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="ml-2 p-2 bg-gray-500 text-white rounded" type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    
    </div>
    </main>
  );
}
