
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Building2, 
  Globe, 
  FileCheck, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  School
} from 'lucide-react';
import { AppraisalData } from '../types';

interface LayoutProps {
  user: { role: string; name: string };
  formData: AppraisalData;
}

const Layout: React.FC<LayoutProps> = ({ user, formData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Section A – Teaching', icon: BookOpen, path: '/section-a' },
    { name: 'Section B – Students', icon: Users, path: '/section-b' },
    { name: 'Section C – Dept Activities', icon: Building2, path: '/section-c' },
    { name: 'Section D – Institute Activity', icon: School, path: '/section-d' },
    { name: 'Section E – Society Contribution', icon: Globe, path: '/section-e' },
    { name: 'Final Review & Submit', icon: FileCheck, path: '/final-review' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } transition-all duration-300 bg-slate-900 text-slate-300 flex flex-col shadow-2xl relative z-30`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
            <School className="text-white" size={24} />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-white text-lg tracking-tight">AppraisalPro</h1>
              <p className="text-xs text-slate-500 font-medium">Faculty Portal v2.0</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-3.5 transition-colors group relative ${
                  isActive 
                    ? 'bg-teal-600/10 text-teal-400 border-r-4 border-teal-500' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon size={22} className={isActive ? 'text-teal-400' : 'group-hover:text-white'} />
                {isSidebarOpen && (
                  <span className="font-medium text-[15px]">{item.name}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-slate-900"
        >
          {isSidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-slate-800 font-semibold text-lg truncate">
              {navItems.find(n => n.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-900">{formData.facultyName}</span>
              <span className="text-xs text-slate-500">{formData.department} | {formData.academicYear}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200 uppercase">
              {formData.facultyName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50 relative">
          <div className="max-w-6xl mx-auto pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
