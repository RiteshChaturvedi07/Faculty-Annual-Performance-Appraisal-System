
import React from 'react';
import { Plus, Trash2, BookOpen, UserCheck, GraduationCap, Calculator } from 'lucide-react';
import { WorkloadRow } from '../types';

interface SectionAProps {
  data: {
    workload: WorkloadRow[];
    btechProjects: number;
    mtechProjects: number;
    mbaMcaProjects: number;
    studentPapers: number;
  };
  updateData: (val: any) => void;
}

const SectionA: React.FC<SectionAProps> = ({ data, updateData }) => {
  const addWorkloadRow = () => {
    const newRow: WorkloadRow = {
      id: Date.now().toString(),
      course: '',
      semester: '',
      subject: '',
      type: 'Theory',
      scheduled: 0,
      held: 0,
      points: 0
    };
    updateData({ ...data, workload: [...data.workload, newRow] });
  };

  const removeRow = (id: string) => {
    updateData({ ...data, workload: data.workload.filter(r => r.id !== id) });
  };

  const updateRow = (id: string, field: keyof WorkloadRow, value: any) => {
    const newWorkload = data.workload.map(r => {
      if (r.id === id) {
        const updated = { ...r, [field]: value };
        // Auto calculate points
        if (field === 'scheduled' || field === 'held') {
          const sched = field === 'scheduled' ? Number(value) : r.scheduled;
          const held = field === 'held' ? Number(value) : r.held;
          updated.points = sched > 0 ? Number(((held / sched) * 10).toFixed(1)) : 0;
        }
        return updated;
      }
      return r;
    });
    updateData({ ...data, workload: newWorkload });
  };

  const totalPoints = data.workload.reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
            <BookOpen size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Section A: Teaching Process</h2>
            <p className="text-slate-500 font-medium">Record your academic workload and teaching efficiency.</p>
          </div>
        </div>

        {/* Workload Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="text-teal-500" size={20} />
              Workload Details
            </h3>
            <button 
              onClick={addWorkloadRow}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-md text-sm font-bold"
            >
              <Plus size={18} /> Add Course
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100/50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Sem & Section</th>
                  <th className="px-4 py-4">Subject</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Sched.</th>
                  <th className="px-4 py-4">Held</th>
                  <th className="px-4 py-4 text-teal-600">Points</th>
                  <th className="px-4 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.workload.map((row) => (
                  <tr key={row.id} className="bg-white hover:bg-teal-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <input 
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-medium" 
                        value={row.course} 
                        onChange={(e) => updateRow(row.id, 'course', e.target.value)}
                        placeholder="e.g., B.Tech"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-medium" 
                        value={row.semester} 
                        onChange={(e) => updateRow(row.id, 'semester', e.target.value)}
                        placeholder="e.g., IV-A"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-medium" 
                        value={row.subject} 
                        onChange={(e) => updateRow(row.id, 'subject', e.target.value)}
                        placeholder="Subject Name"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        className="bg-transparent border-none outline-none focus:ring-0 text-sm font-medium appearance-none cursor-pointer text-slate-700"
                        value={row.type}
                        onChange={(e) => updateRow(row.id, 'type', e.target.value)}
                      >
                        <option value="Theory">Theory</option>
                        <option value="Practical">Lab</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 w-20">
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-center text-sm" 
                        value={row.scheduled} 
                        onChange={(e) => updateRow(row.id, 'scheduled', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3 w-20">
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-center text-sm" 
                        value={row.held} 
                        onChange={(e) => updateRow(row.id, 'held', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3 font-bold text-teal-600 text-center">{row.points}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => removeRow(row.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {data.workload.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 italic">
                      No workload data added yet. Click "Add Course" to begin.
                    </td>
                  </tr>
                )}
              </tbody>
              {data.workload.length > 0 && (
                <tfoot className="bg-teal-50 font-bold text-teal-900 border-t border-teal-100">
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-right">Aggregate Teaching Points:</td>
                    <td className="px-4 py-4 text-center">{totalPoints.toFixed(1)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Projects and Papers */}
        <div className="mt-12 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="text-teal-500" size={20} />
            Student Projects & Publications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-200 transition-colors">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">B.Tech Projects</label>
              <input 
                type="number" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={data.btechProjects}
                onChange={(e) => updateData({...data, btechProjects: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-200 transition-colors">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">M.Tech Projects</label>
              <input 
                type="number" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={data.mtechProjects}
                onChange={(e) => updateData({...data, mtechProjects: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-200 transition-colors">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MBA / MCA</label>
              <input 
                type="number" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={data.mbaMcaProjects}
                onChange={(e) => updateData({...data, mbaMcaProjects: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-200 transition-colors">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Papers Published</label>
              <input 
                type="number" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                value={data.studentPapers}
                onChange={(e) => updateData({...data, studentPapers: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionA;
