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

export interface HolidayItem {
  date: string;
  name: string;
}

export interface GetEventsResponse {
  total: number;
  page: number;
  per_page: number;
  items: EventItem[];
  holidays: HolidayItem[];
}

export const getAllEventsService = async (props: {
  start_date?: string;
  end_date?: string;
}): Promise<GetEventsResponse> => {
  const { start_date, end_date } = props;

  let params = {
    ...(start_date && { start_date: start_date }),
    ...(end_date && { end_date: end_date }),
  };

  const stringParams = new URLSearchParams(params as any).toString();

  const response = await fetch(`/api/events?` + stringParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};
