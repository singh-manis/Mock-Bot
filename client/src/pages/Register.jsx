import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Join MockBot</h2>
            <p className="text-gray-400 text-sm">Create your account to start practicing</p>
          </div>
          
          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl text-sm">{success}</div>}
          
          <div className="mb-4 text-left">
            <label className="block mb-1 text-gray-300 text-sm">Name</label>
            <input 
              type="text" 
              className="w-full border-none bg-white/10 backdrop-blur px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Enter your full name"
              required 
            />
          </div>
          
          <div className="mb-4 text-left">
            <label className="block mb-1 text-gray-300 text-sm">Email</label>
            <input 
              type="email" 
              className="w-full border-none bg-white/10 backdrop-blur px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="mb-6 text-left">
            <label className="block mb-1 text-gray-300 text-sm">Password</label>
            <input 
              type="password" 
              className="w-full border-none bg-white/10 backdrop-blur px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Create a password"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="mt-4 text-center text-sm text-gray-300">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
          </p>
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