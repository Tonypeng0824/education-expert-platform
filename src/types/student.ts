export interface StudentInfo {
  name: string;
  gender: 'male' | 'female';
  school: string;
  grade: string;
  classRank: string;
  totalStudents: string;
  examPeriod: string;
  scores: {
    chinese: string;
    math: string;
    english: string;
    science: string;
    social: string;
    sport: string;
    total: string;
  };
  goals: string;
  concerns: string;
  additionalInfo: string;
}

export type StudentInfoFormData = StudentInfo & {
  _step: number;
};
