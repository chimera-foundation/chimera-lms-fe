export interface Contact {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
  is_online: boolean;
}

export interface CurrentUser {
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
}

export interface GetContactsResponse {
  code: number;
  status: string;
  data: {
    data: Contact[];
  };
}

export interface Participant {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
  is_online: boolean;
}

export interface Conversation {
  ID: string;
  CreatedAt: string;
  CreatedBy: string | null;
  UpdatedAt: string;
  UpdatedBy: string | null;
  DeletedAt: string | null;
  DeletedBy: string | null;
  organization_id: string;
  participants: Participant[];
  unread_count: number;
  is_favorite: boolean;
}

export interface GetConversationsResponse {
  code: number;
  status: string;
  data: {
    data: Conversation[];
  };
}

export interface Message {
  ID: string;
  CreatedAt: string;
  CreatedBy: string | null;
  UpdatedAt: string;
  UpdatedBy: string | null;
  DeletedAt: string | null;
  DeletedBy: string | null;
  conversation_id: string;
  sender_id: string;
  content: string;
  type: string;
  status: string;
}

export interface GetMessagesResponse {
  code: number;
  status: string;
  data: {
    data: Message[];
  };
}

export interface CreateConversationResponse {
  code: number;
  status: string;
  data: {
    data: Conversation;
  };
}

export interface SendMessageResponse {
  code: number;
  status: string;
  data: Message;
}

export interface MarkReadResponse {
  code: number;
  status: string;
  data: {
    message: string;
  };
}

export interface SearchMessagesResponse {
  code: number;
  status: string;
  data: {
    data: Message[];
  };
}
