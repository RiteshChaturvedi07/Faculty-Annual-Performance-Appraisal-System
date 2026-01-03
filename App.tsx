
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SectionA from './pages/SectionA';
import SectionB from './pages/SectionB';
import SectionC from './pages/SectionC';
import SectionD from './pages/SectionD';
import SectionE from './pages/SectionE';
import FinalReview from './pages/FinalReview';
import Layout from './components/Layout';
import { AppraisalData } from './types';

const initialData: AppraisalData = {
  facultyName: "Dr. Rajesh Kumar",
  department: "Computer Science & Engineering",
  academicYear: "2023-24",
  sectionA: {
    workload: [],
    btechProjects: 0,
    mtechProjects: 0,
    mbaMcaProjects: 0,
    studentPapers: 0
  },
  sectionB: {
    feedback: [],
    resultPercentage: 0,
    averageResult: 0,
    mentoring: false,
    mentoringRemarks: "",
    courseRecords: {
      lessonPlan: false,
      questionBank: false,
      attendance: false,
      assignments: false,
      courseNotes: false,
      labRecords: false,
      labManual: false
    }
  },
  sectionC: {
    labDev: false,
    labDevDesc: "",
    deptRoles: [],
    workshops: [],
    researchGuidance: [],
    publications: []
  },
  sectionD: {
    invigilationOdd: 0,
    invigilationEven: 0,
    valuation: "",
    responsibilities: []
  },
  sectionE: {
    swayamCourses: [],
    rdProjects: [],
    books: []
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const [formData, setFormData] = useState<AppraisalData>(initialData);

  const updateFormData = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      if (keys.length === 1) return { ...prev, [keys[0]]: value };
      
      const newPrev = JSON.parse(JSON.stringify(prev));
      let current = newPrev;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newPrev;
    });
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={(role, name) => setUser({ role, name })} />} />
        
        {user ? (
          <Route element={<Layout user={user} formData={formData} />}>
            <Route path="/dashboard" element={<Dashboard formData={formData} />} />
            <Route path="/section-a" element={<SectionA data={formData.sectionA} updateData={(v) => updateFormData('sectionA', v)} />} />
            <Route path="/section-b" element={<SectionB data={formData.sectionB} updateData={(v) => updateFormData('sectionB', v)} />} />
            <Route path="/section-c" element={<SectionC data={formData.sectionC} updateData={(v) => updateFormData('sectionC', v)} />} />
            <Route path="/section-d" element={<SectionD data={formData.sectionD} updateData={(v) => updateFormData('sectionD', v)} />} />
            <Route path="/section-e" element={<SectionE data={formData.sectionE} updateData={(v) => updateFormData('sectionE', v)} />} />
            <Route path="/final-review" element={<FinalReview formData={formData} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
