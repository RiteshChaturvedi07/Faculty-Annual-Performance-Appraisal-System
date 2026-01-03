
import React from 'react';
import { Users, Star, ClipboardCheck, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { FeedbackRow } from '../types';

interface SectionBProps {
  data: any;
  updateData: (val: any) => void;
}

const SectionB: React.FC<SectionBProps> = ({ data, updateData }) => {
  const addFeedback = () => {
    const newRow: FeedbackRow = { id: Date.now().toString(), course: '', semester: '', subject: '', index: 0, average: 0 };
    updateData({ ...data, feedback: [...data.feedback, newRow] });
  };

  const updateFeedback = (id: string, field: string, value: any) => {
    const updated = data.feedback.map((r: any) => r.id === id ? { ...r, [field]: value } : r);
    updateData({ ...data, feedback: updated });
  };

  const removeFeedback = (id: string) => {
    updateData({ ...data, feedback: data.feedback.filter((r: any) => r.id !== id) });
  };

  const toggleRecord = (key: string) => {
    updateData({ ...data, courseRecords: { ...data.courseRecords, [key]: !data.courseRecords[key] } });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <Users size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Section B: Student Details</h2>
            <p className="text-slate-500 font-medium">Record student feedback, performance, and mentoring details.</p>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Star className="text-indigo-500" size={20} />
              Students’ Feedback
            </h3>
            <button onClick={addFeedback} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-bold">
              <Plus size={18} /> Add Feedback
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100/50 text-slate-600 text-xs font-bold uppercase">
                <tr>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Sem</th>
                  <th className="px-4 py-4">Subject</th>
                  <th className="px-4 py-4">Feedback Index</th>
                  <th className="px-4 py-4">Avg Feedback</th>
                  <th className="px-4 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.feedback.map((row: any) => (
                  <tr key={row.id} className="bg-white hover:bg-indigo-50/30 transition-colors">
                    <td className="px-4 py-3"><input className="w-full outline-none bg-transparent" value={row.course} onChange={(e) => updateFeedback(row.id, 'course', e.target.value)} /></td>
                    <td className="px-4 py-3"><input className="w-full outline-none bg-transparent" value={row.semester} onChange={(e) => updateFeedback(row.id, 'semester', e.target.value)} /></td>
                    <td className="px-4 py-3"><input className="w-full outline-none bg-transparent" value={row.subject} onChange={(e) => updateFeedback(row.id, 'subject', e.target.value)} /></td>
                    <td className="px-4 py-3"><input type="number" className="w-full outline-none bg-transparent" value={row.index} onChange={(e) => updateFeedback(row.id, 'index', e.target.value)} /></td>
                    <td className="px-4 py-3"><input type="number" className="w-full outline-none bg-transparent" value={row.average} onChange={(e) => updateFeedback(row.id, 'average', e.target.value)} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => removeFeedback(row.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Performance & Mentoring */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Star className="text-amber-500" size={20} />
              Results & Mentoring
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Result %</label>
                <input type="number" className="w-full p-2 rounded-lg border border-slate-200" value={data.resultPercentage} onChange={e => updateData({...data, resultPercentage: e.target.value})} />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Avg Result</label>
                <input type="number" className="w-full p-2 rounded-lg border border-slate-200" value={data.averageResult} onChange={e => updateData({...data, averageResult: e.target.value})} />
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <input type="checkbox" checked={data.mentoring} onChange={e => updateData({...data, mentoring: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" />
                <span className="font-bold text-slate-700">Mentoring System (Yes/No)</span>
              </div>
              <textarea 
                placeholder="Remarks on mentoring session..." 
                className="w-full h-24 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                value={data.mentoringRemarks}
                onChange={e => updateData({...data, mentoringRemarks: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Course Records Checklist */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ClipboardCheck className="text-teal-500" size={20} />
              Course Records Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(data.courseRecords).map(([key, val]) => (
                <button 
                  key={key}
                  onClick={() => toggleRecord(key)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${val ? 'border-teal-500 bg-teal-50 text-teal-900' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${val ? 'bg-teal-500 border-teal-500 text-white' : 'border-slate-300'}`}>
                    {val && <ClipboardCheck size={12} />}
                  </div>
                  <span className="text-sm font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionB;
