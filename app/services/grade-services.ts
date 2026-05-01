import {
  GetCoursesResponse,
  GetSubjectsResponse,
  GetTrenResponse,
  GetCharacterPointsResponse,
} from "../models/grade";

export const getTrendService = async (props: {
  filter?: string;
}): Promise<GetTrenResponse> => {
  const params = new URLSearchParams();

  if (props?.filter) {
    params.append("filter", props.filter);
  }

  const queryString = params.toString();
  const url = `/api/grade/trend${queryString ? `?${queryString}` : ""}`;

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

export const getCoursesService = async (): Promise<GetCoursesResponse> => {
  const response = await fetch("/api/grade/courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getSubjectService = async (props: {
  filter?: string;
}): Promise<GetSubjectsResponse> => {
  const params = new URLSearchParams();

  if (props?.filter) {
    params.append("filter", props.filter);
  }

  const queryString = params.toString();
  const url = `/api/grade/subjects${queryString ? `?${queryString}` : ""}`;

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

export const getCharacterPointsService = async (props: {
  filter?: string;
  limit?: number;
  offset?: number;
}): Promise<GetCharacterPointsResponse> => {
  const params = new URLSearchParams();

  if (props?.filter) {
    params.append("filter", props.filter);
  }
  if (props?.limit !== undefined) {
    params.append("limit", props.limit.toString());
  }
  if (props?.offset !== undefined) {
    params.append("offset", props.offset.toString());
  }

  const queryString = params.toString();
  const url = `/api/grade/character-points${queryString ? `?${queryString}` : ""}`;

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
