import {
  GetLearningCoursesResponse,
  GetLearningResourcesResponse,
  GetCourseCurriculumResponse,
  CompleteModuleResponse,
} from "../models/learning";

export const getLearningCoursesService = async (): Promise<GetLearningCoursesResponse> => {
  const response = await fetch("/api/learning/courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getLearningResourcesService = async (props: {
  page?: number;
  limit?: number;
}): Promise<GetLearningResourcesResponse> => {
  const params = new URLSearchParams();
  if (props?.page) params.append("page", props.page.toString());
  if (props?.limit) params.append("limit", props.limit.toString());

  const queryString = params.toString();
  const url = `/api/learning/resources${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const getCourseCurriculumService = async (courseId: string): Promise<GetCourseCurriculumResponse> => {
  const response = await fetch(`/api/learning/curriculum/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const completeModuleService = async (moduleId: string): Promise<CompleteModuleResponse> => {
  const response = await fetch(`/api/learning/modules/${moduleId}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};
