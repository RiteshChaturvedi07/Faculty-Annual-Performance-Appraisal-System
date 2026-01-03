
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, UserCircle, Key, ChevronDown } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState('Faculty');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role, "Dr. Rajesh Kumar");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Header/Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-2xl shadow-xl mb-6 transform rotate-3 transition hover:rotate-0">
            <School className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Appraisal Pro</h1>
          <p className="text-slate-500 mt-2 font-medium">Academic Performance Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Login Role</label>
              <div className="relative">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Faculty">Faculty Member</option>
                  <option value="HOD">Head of Department (HOD)</option>
                  <option value="Principal">Principal / Dean</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Institutional Email</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <UserCircle size={20} />
                </span>
                <input 
                  type="email" 
                  placeholder="name@institute.edu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <Key size={20} />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm text-teal-600 font-semibold hover:underline">Forgot password?</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Secure Sign In
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Protected by AES-256 Institutional Security. <br />
          Contact IT Support for access issues.
        </p>
      </div>
    </div>
  );
};

export default Login;
