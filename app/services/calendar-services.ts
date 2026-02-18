import { GetEventsResponse } from "../models/event";

export const getCalendarService = async (props: {
  start_date?: string;
  end_date?: string;
}): Promise<GetEventsResponse> => {
  const params = new URLSearchParams();

  if (props?.start_date) {
    params.append("start", props.start_date);
  }
  if (props?.end_date) {
    params.append("end", props.end_date);
  }

  const queryString = params.toString();
  const url = `/api/calendar${queryString ? `?${queryString}` : ""}`;

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
