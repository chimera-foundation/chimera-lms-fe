export interface EventItem {
  ID: string;
  CreatedAt: Date;
  CreatedBy: Date;
  UpdatedAt: Date;
  UpdatedBy: Date;
  DeletedAt: Date;
  DeletedBy: Date;
  OrganizationID: string;
  Title: string;
  Description: string;
  Location: string;
  EventType: string;
  Color: string;
  StartAt: Date;
  EndAt: Date;
  IsAllDay: boolean;
  RecurrenceRule: string;
  Scope: string;
  CohortID: string;
  SectionID: string;
  UserID: string;
  SourceID: string;
  SourceType: string;
  ImageURL: string;
}

export interface HolidayItem {
  date: string;
  name: string;
}

export interface GetEventsResponse {
  code: number;
  status: string;
  data: EventItem[];
}

export const getAllEventsService = async (props: {
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
  const url = `/api/events${queryString ? `?${queryString}` : ""}`;

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
