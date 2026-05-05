import {
  GetAttendanceResponse,
  GetSubjectAttendanceResponse,
} from "../models/attendance";

export const getAttendanceService = async (props: {
  filter?: string;
  limit?: number;
  offset?: number;
}): Promise<GetAttendanceResponse> => {
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
  const url = `/api/attendances${queryString ? `?${queryString}` : ""}`;

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

export const getSubjectAttendanceService = async (props: {
  filter?: string;
}): Promise<GetSubjectAttendanceResponse> => {
  const params = new URLSearchParams();

  if (props?.filter) {
    params.append("filter", props.filter);
  }

  const queryString = params.toString();
  const url = `/api/attendances/subjects${queryString ? `?${queryString}` : ""}`;

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
