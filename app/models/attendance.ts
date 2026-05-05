export interface AttendanceSummary {
  overallPercentage: number;
  presentDays: number;
  absentDays: number;
  excusedDays: number;
  totalDays: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  day: string;
  status: "present" | "absent" | "late" | "excused";
  timeIn?: string;
}

export interface GetAttendanceResponse {
  code: number;
  status: string;
  data: {
    summary: AttendanceSummary;
    records: AttendanceRecord[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface SubjectAttendance {
  subjectName: string;
  totalClasses: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  attendancePercentage: number;
}

export interface GetSubjectAttendanceResponse {
  code: number;
  status: string;
  data: SubjectAttendance[];
}
