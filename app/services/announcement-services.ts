export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  published_at: string;
  expires_at: string;
  priority: string;
  image_url: string;
  is_active: boolean;
}

export interface GetAnnouncementsResponse {
  total: number;
  page: number;
  per_page: number;
  items: AnnouncementItem[];
}

export const getAllAnnouncementsService = async (props: {
  token: string;
}): Promise<GetAnnouncementsResponse> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/announcements`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};
