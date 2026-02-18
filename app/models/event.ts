export interface EventItem {
  ID: string;
  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;
  DeletedAt: Date;
  DeletedBy: string;
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

export interface GetEventsResponse {
  code: number;
  status: string;
  data: EventItem[];
}
