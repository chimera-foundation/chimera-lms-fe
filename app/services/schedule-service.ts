import { ScheduleItem } from "../redux/schedule/schedule-slice";

export interface GetScheduleResponse {
  total: number;
  page: number;
  per_page: number;
  items: ScheduleItem[] | [];
}

export const getAllSchedulesService = async (
  props: {
    itemize?: boolean;
    page?: number;
    per_page?: number;
  } = {}
): Promise<GetScheduleResponse> => {
  const { itemize, page, per_page } = props;

  let params = {
    ...(itemize && { itemize: itemize }),
    ...(page && { page: page }),
    ...(per_page && { per_page: per_page }),
  };

  const stringParams = new URLSearchParams(params as any).toString();

  const response = await fetch(`/api/schedules?` + stringParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};
