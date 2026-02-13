export interface AnnouncementItem {
  ID: string;
  CreatedAt: Date;
  CreatedBy: null;
  UpdatedAt: Date;
  UpdatedBy: null;
  DeletedAt: null;
  DeletedBy: null;
  OrganizationID: string;
  Title: string;
  Description: string;
  Location: string;
  EventType: string;
  Color: string;
  StartAt: Date;
  EndAt: Date;
  IsAllDay: boolean;
  RecurrenceRule: null;
  Scope: string;
  CohortID: null;
  SectionID: null;
  UserID: null;
  SourceID: null;
  SourceType: null;
  ImageURL: string;
}

export interface GetAnnouncementsResponse {
  code: number;
  status: string;
  data: AnnouncementItem[];
}

export const getAllAnnouncementsService = async (props: {
  start_date?: string;
  end_date?: string;
}): Promise<GetAnnouncementsResponse> => {
  const params = new URLSearchParams();

  if (props?.start_date) {
    params.append("start_date", props.start_date);
  }
  if (props?.end_date) {
    params.append("end_date", props.end_date);
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
