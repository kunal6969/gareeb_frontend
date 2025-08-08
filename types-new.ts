// CGPA/SGPA Calculator Types
export interface Semester {
  id: string;
  sgpa: string;
  credits: string;
}

export interface CgpaData {
  semesters: Semester[];
}

// Subject interface for SGPA calculation
export interface Subject {
  id: string;
  grade: string;
  credits: string;
  error?: 'grade' | 'credits' | null;
}
