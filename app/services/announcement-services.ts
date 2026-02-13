export interface AnnouncementItem {
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
