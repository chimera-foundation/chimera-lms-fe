export interface AssessmentItems {
  id: string;
  subject: string;
  title: string;
  attachment_url: string;
  status: string;
  type: string;
  sub_type: string;
  due_date: Date;
}

export interface AssessmentType {
  summary: AssessmentSummary;
  assessments: AssessmentItems[];
}

export interface AssesmentState {
  assessmentExam: AssessmentType | null;
  assessmentAssignment: AssessmentType | null;
  loading: boolean;
  error: string | null;
}

export interface AssessmentSummary {
  pending: number;
  submitted: number;
  done: number;
  overdue: number;
}

export interface GetAssessmentsResponse {
  code: number;
  status: string;
  data: {
    summary: AssessmentSummary;
    assessments: AssessmentItems[];
  };
}

export const getAllAssessmentsAssignmentService = async (props?: {
  start_date?: string;
  end_date?: string;
  type?: string;
}): Promise<GetAssessmentsResponse> => {
  const params = new URLSearchParams();

  if (props?.start_date) {
    params.append("start_date", props.start_date);
  }
  if (props?.end_date) {
    params.append("end_date", props.end_date);
  }
  if (props?.type) {
    params.append("type", props.type);
  }

  const queryString = params.toString();
  const url = `/api/assessments${queryString ? `?${queryString}` : ""}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch assessments: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
export const getAllAssessmentsExamService = async (props?: {
  start_date?: string;
  end_date?: string;
  type?: string;
}): Promise<GetAssessmentsResponse> => {
  const params = new URLSearchParams();

  if (props?.start_date) {
    params.append("start_date", props.start_date);
  }
  if (props?.end_date) {
    params.append("end_date", props.end_date);
  }
  if (props?.type) {
    params.append("type", props.type);
  }

  const queryString = params.toString();
  const url = `/api/assessments${queryString ? `?${queryString}` : ""}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch assessments: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
