
import React, { useState } from 'react';
import { FileCheck, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppraisalData } from '../types';

interface FinalReviewProps {
  formData: AppraisalData;
}

const FinalReview: React.FC<FinalReviewProps> = ({ formData }) => {
  const [declared, setDeclared] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calculateSectionScores = () => {
    return [
      { name: "Teaching (A)", max: 50, score: Math.min(50, formData.sectionA.workload.reduce((a,c) => a+c.points, 0)) },
      { name: "Students (B)", max: 20, score: formData.sectionB.feedback.length > 0 ? 15 : 0 },
      { name: "Dept (C)", max: 15, score: formData.sectionC.publications.length * 5 },
      { name: "Institute (D)", max: 10, score: formData.sectionD.responsibilities.length * 2 },
      { name: "Society (E)", max: 5, score: formData.sectionE.swayamCourses.length * 2.5 }
    ];
  };

  const scores = calculateSectionScores();
  const totalScore = Math.min(100, scores.reduce((a,c) => a+c.score, 0));

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-100 text-teal-600 rounded-full">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Appraisal Submitted!</h1>
          <p className="text-slate-500 mt-2 text-lg">Your annual performance appraisal for {formData.academicYear} has been successfully sent to the HOD for review.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Reference ID</span>
            <span className="text-slate-900 font-mono font-bold">APPR-2024-RK88</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Submission Date</span>
            <span className="text-slate-900 font-bold">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-white">
              <FileCheck size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Final Review & Submission</h2>
              <p className="text-slate-500 font-medium">Verify your details and scores before final submission.</p>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} /> Download Draft
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Summary Cards */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Appraisal Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scores.map(s => (
                <div key={s.name} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:border-teal-300 transition-colors">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.name}</p>
                    <p className="text-xl font-bold text-slate-800">{s.score} / {s.max}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-teal-500 rotate-45 group-hover:rotate-0 transition-transform"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Score */}
          <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Estimated API Score</p>
            <h4 className="text-6xl font-black mb-2 text-teal-400">{totalScore}</h4>
            <p className="text-slate-400 text-sm">Calculated based on current entries</p>
            <div className="mt-8 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full" style={{ width: `${totalScore}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-10 flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            Please ensure all your teaching records and research publications are accurate. Once submitted, the form will be locked for editing until it is reviewed by the HOD.
          </p>
        </div>

        <div className="space-y-6 pt-6 border-t border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="mt-1 w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              checked={declared}
              onChange={e => setDeclared(e.target.checked)}
            />
            <span className="text-slate-600 text-sm font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
              I hereby declare that all information provided in this appraisal application is true to the best of my knowledge and is supported by documentary evidence available in the department/institute records.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              disabled={!declared}
              onClick={() => setSubmitted(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-lg ${declared ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100 transform hover:-translate-y-1' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
            >
              <Send size={20} /> Submit for Review
            </button>
            <button className="flex-1 sm:hidden flex items-center justify-center gap-2 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-600">
              <Download size={20} /> Save PDF Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;
