
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Award,
  BookOpen
} from 'lucide-react';
import { AppraisalData } from '../types';

interface DashboardProps {
  formData: AppraisalData;
}

const Dashboard: React.FC<DashboardProps> = ({ formData }) => {
  const sections = [
    { id: 'sectionA', title: 'Teaching Process', path: '/section-a', completed: formData.sectionA.workload.length > 0 },
    { id: 'sectionB', title: 'Student Details', path: '/section-b', completed: formData.sectionB.feedback.length > 0 },
    { id: 'sectionC', title: 'Dept Activities', path: '/section-c', completed: formData.sectionC.deptRoles.length > 0 },
    { id: 'sectionD', title: 'Institute Activity', path: '/section-d', completed: !!formData.sectionD.valuation },
    { id: 'sectionE', title: 'Society Contribution', path: '/section-e', completed: formData.sectionE.swayamCourses.length > 0 },
  ];

  const completionCount = sections.filter(s => s.completed).length;
  const progress = (completionCount / sections.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome, {formData.facultyName}!</h1>
          <p className="text-slate-500 mt-1 font-medium italic">"Excellence in education is the foundation of progress."</p>
        </div>
        <div className="flex items-center gap-4 bg-teal-50 px-6 py-3 rounded-2xl border border-teal-100 shrink-0">
          <Clock className="text-teal-600" size={24} />
          <div>
            <p className="text-xs text-teal-600 font-bold uppercase tracking-wider">Submission Deadline</p>
            <p className="text-slate-900 font-bold">15 June, 2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 group hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <span className="text-2xl font-bold text-slate-900">{progress.toFixed(0)}%</span>
          </div>
          <h3 className="text-slate-800 font-bold">Appraisal Progress</h3>
          <p className="text-slate-500 text-sm mt-1 mb-4">You have completed {completionCount} out of {sections.length} sections.</p>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-bold text-slate-900">{formData.sectionA.workload.length}</span>
          </div>
          <h3 className="text-slate-800 font-bold">Courses Taught</h3>
          <p className="text-slate-500 text-sm mt-1">Teaching workload recorded for the current year.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <span className="text-2xl font-bold text-slate-900">{formData.sectionC.publications.length}</span>
          </div>
          <h3 className="text-slate-800 font-bold">Publications</h3>
          <p className="text-slate-500 text-sm mt-1">Research papers and articles published this cycle.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Application Checklist</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {sections.map((section) => (
            <Link 
              key={section.id}
              to={section.path}
              className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {section.completed ? (
                  <CheckCircle2 className="text-teal-500" size={24} />
                ) : (
                  <Circle className="text-slate-300 group-hover:text-slate-400" size={24} />
                )}
                <div>
                  <p className={`font-semibold ${section.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                    {section.title}
                  </p>
                  <p className="text-sm text-slate-400">
                    {section.completed ? 'Section completed and verified' : 'Click to fill details'}
                  </p>
                </div>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
