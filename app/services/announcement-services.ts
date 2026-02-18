import { EventItem, GetEventsResponse } from "../models/event";

export const getAllAnnouncementsService = async (props: {
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

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  const queryString = params.toString();
  const url = `/api/announcements${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};
