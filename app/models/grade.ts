export interface TrendItem {
  label: string;
  average: number;
  count: number;
}

export interface GetTrenResponse {
  code: number;
  status: string;
  data: TrendItem[];
}

export interface GetCoursesResponse {
  code: number;
  status: string;
  data: CourseItem[];
}

export interface CourseItem {
  courseId: string;
  courseName: string;
  average: number;
  count: number;
}

export interface GetSubjectsResponse {
  code: number;
  status: string;
  data: Subjects[];
}

export interface Subjects {
  subjectId: string;
  subjectName: string;
  overallAverage: number;
  typeAverages: TypeAverage[];
}

export interface TypeAverage {
  type: string;
  average: number;
}
