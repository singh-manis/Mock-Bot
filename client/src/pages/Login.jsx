import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { LogIn } from 'lucide-react';
import { API_ENDPOINTS } from '../config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        name: data.user?.name || email.split('@')[0],
        email: data.user?.email || email
      }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
        <form onSubmit={handleSubmit} className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/10">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Login to MockBot</h2>
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4 text-left">
            <label className="block mb-1 text-gray-300">Email</label>
            <input type="email" className="w-full border-none bg-white/10 backdrop-blur px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6 text-left">
            <label className="block mb-1 text-gray-300">Password</label>
            <input type="password" className="w-full border-none bg-white/10 backdrop-blur px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <p className="mt-4 text-center text-sm text-gray-300">Don't have an account? <Link to="/register" className="text-cyan-400 hover:underline">Register</Link></p>
        </form>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </Layout>
  );
} 