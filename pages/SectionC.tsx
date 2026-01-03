
import React from 'react';
import { Building2, Microscope, FileText, Plus, Trash2, Award } from 'lucide-react';

interface SectionCProps {
  data: any;
  updateData: (val: any) => void;
}

const SectionC: React.FC<SectionCProps> = ({ data, updateData }) => {
  const addPublication = () => {
    const newPub = { id: Date.now().toString(), title: '', category: 'A', issn: '', year: new Date().getFullYear() };
    updateData({ ...data, publications: [...data.publications, newPub] });
  };

  const updatePub = (id: string, field: string, val: any) => {
    const updated = data.publications.map((p: any) => p.id === id ? { ...p, [field]: val } : p);
    updateData({ ...data, publications: updated });
  };

  const addGuidance = () => {
    const newG = { id: Date.now().toString(), scholar: '', status: 'Ongoing' };
    updateData({ ...data, researchGuidance: [...data.researchGuidance, newG] });
  };

  const roles = ["Cultural Coordinator", "Time Table Incharge", "NBA/NAAC Incharge", "Lab Incharge", "Project Coordinator"];

  const toggleRole = (role: string) => {
    const current = [...data.deptRoles];
    const index = current.indexOf(role);
    if (index > -1) current.splice(index, 1);
    else current.push(role);
    updateData({ ...data, deptRoles: current });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Building2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Section C: Department Activities</h2>
            <p className="text-slate-500 font-medium">Record departmental roles, lab development, and research work.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Lab & Roles */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Microscope className="text-blue-500" size={20} /> Lab Development
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <input type="checkbox" checked={data.labDev} onChange={e => updateData({...data, labDev: e.target.checked})} className="w-5 h-5 rounded text-blue-600" />
                <span className="font-bold text-slate-700">Lab Modernization / Setup</span>
              </div>
              <textarea 
                placeholder="Describe details of modernization..." 
                className="w-full h-24 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                value={data.labDevDesc}
                onChange={e => updateData({...data, labDevDesc: e.target.value})}
              />
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Departmental Roles</h3>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <button 
                    key={role} 
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${data.deptRoles.includes(role) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Research Guidance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Research Guidance</h3>
              <button onClick={addGuidance} className="text-blue-600 hover:text-blue-800 font-bold text-sm">+ Add Scholar</button>
            </div>
            <div className="space-y-3">
              {data.researchGuidance.map((g: any) => (
                <div key={g.id} className="flex gap-2 items-center p-3 bg-slate-50 rounded-xl">
                  <input className="flex-1 bg-transparent border-none outline-none font-medium text-sm" placeholder="Scholar Name" value={g.scholar} onChange={e => {
                    const updated = data.researchGuidance.map((x:any) => x.id === g.id ? {...x, scholar: e.target.value} : x);
                    updateData({...data, researchGuidance: updated});
                  }} />
                  <select className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-bold" value={g.status} onChange={e => {
                    const updated = data.researchGuidance.map((x:any) => x.id === g.id ? {...x, status: e.target.value} : x);
                    updateData({...data, researchGuidance: updated});
                  }}>
                    <option>Ongoing</option>
                    <option>Submitted</option>
                    <option>Awarded</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} /> Research Publications
            </h3>
            <button onClick={addPublication} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md">Add Publication</button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-4">Title</th>
                  <th className="px-4 py-4">Cat (A/B/C)</th>
                  <th className="px-4 py-4">ISSN/ISBN</th>
                  <th className="px-4 py-4">Year</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.publications.map((p: any) => (
                  <tr key={p.id} className="text-sm">
                    <td className="px-4 py-3"><input className="w-full bg-transparent border-none outline-none" value={p.title} onChange={e => updatePub(p.id, 'title', e.target.value)} placeholder="Paper Title" /></td>
                    <td className="px-4 py-3">
                      <select className="bg-transparent" value={p.category} onChange={e => updatePub(p.id, 'category', e.target.value)}>
                        <option>A</option><option>B</option><option>C</option>
                      </select>
                    </td>
                    <td className="px-4 py-3"><input className="w-full bg-transparent border-none outline-none" value={p.issn} onChange={e => updatePub(p.id, 'issn', e.target.value)} placeholder="ISSN" /></td>
                    <td className="px-4 py-3"><input type="number" className="w-16 bg-transparent border-none outline-none" value={p.year} onChange={e => updatePub(p.id, 'year', e.target.value)} /></td>
                    <td><button onClick={() => updateData({...data, publications: data.publications.filter((x:any)=>x.id!==p.id)})} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionC;
