import {
  GetContactsResponse,
  GetConversationsResponse,
  GetMessagesResponse,
  SearchMessagesResponse,
  CurrentUser,
  CreateConversationResponse,
  SendMessageResponse,
  MarkReadResponse,
} from "../models/messaging";

export const getMeService = async (): Promise<{ data: CurrentUser }> => {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return response.json();
};

export const getContactsService =
  async (): Promise<GetContactsResponse> => {
    const response = await fetch("/api/messaging/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.json();
  };

export const getConversationsService =
  async (): Promise<GetConversationsResponse> => {
    const response = await fetch("/api/messaging/conversations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.json();
  };

export const getMessagesService = async (
  conversationId: string,
): Promise<GetMessagesResponse> => {
  const response = await fetch(
    `/api/messaging/conversations/${conversationId}/messages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    },
  );
  return response.json();
};

export const createConversationService = async (props: {
  participant_ids: string[];
}): Promise<CreateConversationResponse> => {
  const response = await fetch("/api/messaging/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(props),
  });
  return response.json();
};

export const toggleFavoriteService = async (
  conversationId: string,
  isFavorite: boolean,
): Promise<void> => {
  await fetch(
    `/api/messaging/conversations/${conversationId}/favorite`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ is_favorite: isFavorite }),
    },
  );
};

export const sendMessageService = async (props: {
  conversation_id: string;
  content: string;
  attachment_ids?: string[];
}): Promise<SendMessageResponse> => {
  const response = await fetch("/api/messaging/messages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(props),
  });
  return response.json();
};

export const markMessagesReadService = async (
  conversationId: string,
  lastMessageId: string,
): Promise<MarkReadResponse> => {
  const response = await fetch(
    `/api/messaging/messages/${conversationId}/read`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ last_message_id: lastMessageId }),
    },
  );
  return response.json();
};

export const searchMessagesService = async (
  query: string,
): Promise<SearchMessagesResponse> => {
  const params = new URLSearchParams({ query });
  const response = await fetch(
    `/api/messaging/messages/search?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    },
  );
  return response.json();
};
