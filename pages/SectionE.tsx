
import React from 'react';
import { Globe, BookOpen, Rocket, FileUp, Plus, Trash2 } from 'lucide-react';

interface SectionEProps {
  data: any;
  updateData: (val: any) => void;
}

const SectionE: React.FC<SectionEProps> = ({ data, updateData }) => {
  const addSwayam = () => {
    const newItem = { id: Date.now().toString(), name: '', duration: '', certificate: null };
    updateData({ ...data, swayamCourses: [...data.swayamCourses, newItem] });
  };

  const addProject = () => {
    const newItem = { id: Date.now().toString(), title: '', agency: '', amount: 0 };
    updateData({ ...data, rdProjects: [...data.rdProjects, newItem] });
  };

  const addBooks = () => {
    const newItem = { id: Date.now().toString(), title: '', publisher: '', isbn: '' };
    updateData({ ...data, books: [...data.books, newItem] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <Globe size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Section E: Contribution to Society</h2>
            <p className="text-slate-500 font-medium">SWAYAM courses, R&D projects, and publications.</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* SWAYAM Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="text-emerald-500" size={20} /> SWAYAM / AICTE Courses
              </h3>
              <button onClick={addSwayam} className="text-emerald-600 font-bold hover:underline text-sm">+ Add Course</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.swayamCourses.map((c: any) => (
                <div key={c.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group">
                  <button onClick={() => updateData({...data, swayamCourses: data.swayamCourses.filter((x:any)=>x.id!==c.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18}/></button>
                  <div className="grid gap-4">
                    <input className="bg-white p-3 rounded-xl border border-slate-200 w-full" placeholder="Course Name" value={c.name} onChange={e => {
                       const updated = data.swayamCourses.map((x:any)=>x.id===c.id?{...x, name:e.target.value}:x);
                       updateData({...data, swayamCourses: updated});
                    }} />
                    <div className="flex gap-4">
                      <input className="bg-white p-3 rounded-xl border border-slate-200 flex-1" placeholder="Duration" value={c.duration} />
                      <button className="flex items-center gap-2 px-4 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs"><FileUp size={14}/> Upload</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* R&D Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Rocket className="text-emerald-500" size={20} /> R&D Projects
              </h3>
              <button onClick={addProject} className="text-emerald-600 font-bold hover:underline text-sm">+ Add Project</button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-4">Title</th>
                    <th className="px-4 py-4">Funding Agency</th>
                    <th className="px-4 py-4">Amount (INR)</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.rdProjects.map((p: any) => (
                    <tr key={p.id}>
                      <td className="px-4 py-3"><input className="w-full bg-transparent border-none outline-none" placeholder="Project Title" value={p.title} onChange={e => {
                         const updated = data.rdProjects.map((x:any)=>x.id===p.id?{...x, title:e.target.value}:x);
                         updateData({...data, rdProjects: updated});
                      }} /></td>
                      <td className="px-4 py-3"><input className="w-full bg-transparent border-none outline-none" placeholder="Agency" value={p.agency} /></td>
                      <td className="px-4 py-3"><input type="number" className="w-full bg-transparent border-none outline-none" value={p.amount} /></td>
                      <td><button onClick={() => updateData({...data, rdProjects: data.rdProjects.filter((x:any)=>x.id!==p.id)})} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Books Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="text-emerald-500" size={20} /> Books / Chapters Published
              </h3>
              <button onClick={addBooks} className="text-emerald-600 font-bold hover:underline text-sm">+ Add Book</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.books.map((b: any) => (
                <div key={b.id} className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 transition-colors space-y-3 shadow-sm">
                  <input className="w-full font-bold text-slate-800 placeholder-slate-400 outline-none" placeholder="Book Title" value={b.title} onChange={e => {
                     const updated = data.books.map((x:any)=>x.id===b.id?{...x, title:e.target.value}:x);
                     updateData({...data, books: updated});
                  }} />
                  <input className="w-full text-sm text-slate-600 placeholder-slate-400 outline-none" placeholder="Publisher" value={b.publisher} />
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <input className="text-xs text-slate-400 placeholder-slate-300 outline-none w-2/3" placeholder="ISBN Number" value={b.isbn} />
                    <button onClick={() => updateData({...data, books: data.books.filter((x:any)=>x.id!==b.id)})} className="text-slate-300 hover:text-red-400"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SectionE;
