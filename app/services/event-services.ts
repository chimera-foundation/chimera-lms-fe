export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_type: string;
  location: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  recurrence_rule: string;
  is_active: boolean;
}

export interface GetEventsResponse {
  total: number;
  page: number;
  per_page: number;
  items: EventItem[];
}

export const getAllEventsService = async (props: {
  token: string;
}): Promise<GetEventsResponse> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/events`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};
