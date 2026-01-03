
export enum AppraisalSection {
  DASHBOARD = 'dashboard',
  SECTION_A = 'sectionA',
  SECTION_B = 'sectionB',
  SECTION_C = 'sectionC',
  SECTION_D = 'sectionD',
  SECTION_E = 'sectionE',
  FINAL_REVIEW = 'finalReview'
}

export interface WorkloadRow {
  id: string;
  course: string;
  semester: string;
  subject: string;
  type: 'Theory' | 'Practical';
  scheduled: number;
  held: number;
  points: number;
}

export interface FeedbackRow {
  id: string;
  course: string;
  semester: string;
  subject: string;
  index: number;
  average: number;
}

export interface AppraisalData {
  facultyName: string;
  department: string;
  academicYear: string;
  sectionA: {
    workload: WorkloadRow[];
    btechProjects: number;
    mtechProjects: number;
    mbaMcaProjects: number;
    studentPapers: number;
  };
  sectionB: {
    feedback: FeedbackRow[];
    resultPercentage: number;
    averageResult: number;
    mentoring: boolean;
    mentoringRemarks: string;
    courseRecords: {
      lessonPlan: boolean;
      questionBank: boolean;
      attendance: boolean;
      assignments: boolean;
      courseNotes: boolean;
      labRecords: boolean;
      labManual: boolean;
    };
  };
  sectionC: {
    labDev: boolean;
    labDevDesc: string;
    deptRoles: string[];
    workshops: any[];
    researchGuidance: any[];
    publications: any[];
  };
  sectionD: {
    invigilationOdd: number;
    invigilationEven: number;
    valuation: string;
    responsibilities: string[];
  };
  sectionE: {
    swayamCourses: any[];
    rdProjects: any[];
    books: any[];
  };
}

export type Role = 'Faculty' | 'HOD' | 'Principal';
