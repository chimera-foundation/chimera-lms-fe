import {
  Contact,
  Conversation,
  Message,
  CurrentUser,
} from "@/app/models/messaging";
import {
  getContactsService,
  getConversationsService,
  getMessagesService,
  createConversationService,
  toggleFavoriteService,
  markMessagesReadService,
  searchMessagesService,
  getMeService,
  sendMessageService,
} from "@/app/services/messaging-services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MessagingState {
  contacts: Contact[];
  conversations: Conversation[];
  messages: Message[];
  searchResults: Message[];
  activeConversationId: string | null;
  currentUser: CurrentUser | null;
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
}

const initialState: MessagingState = {
  contacts: [],
  conversations: [],
  messages: [],
  searchResults: [],
  activeConversationId: null,
  currentUser: null,
  loading: false,
  sendingMessage: false,
  error: null,
};

export const getCurrentUser = createAsyncThunk(
  "messaging/getCurrentUser",
  async () => {
    const response = await getMeService();
    return response;
  },
);

export const getContacts = createAsyncThunk(
  "messaging/getContacts",
  async () => {
    const response = await getContactsService();
    return response;
  },
);

export const getConversations = createAsyncThunk(
  "messaging/getConversations",
  async () => {
    const response = await getConversationsService();
    return response;
  },
);

export const getMessages = createAsyncThunk(
  "messaging/getMessages",
  async (conversationId: string) => {
    const response = await getMessagesService(conversationId);
    return { conversationId, response };
  },
);

export const createConversation = createAsyncThunk(
  "messaging/createConversation",
  async (props: { participant_ids: string[] }) => {
    const response = await createConversationService(props);
    return response;
  },
);

export const sendMessage = createAsyncThunk(
  "messaging/sendMessage",
  async (props: {
    conversation_id: string;
    content: string;
    attachment_ids?: string[];
  }) => {
    const response = await sendMessageService(props);
    return response;
  },
);

export const toggleFavorite = createAsyncThunk(
  "messaging/toggleFavorite",
  async (props: { conversationId: string; isFavorite: boolean }) => {
    await toggleFavoriteService(props.conversationId, props.isFavorite);
    return props;
  },
);

export const markMessagesRead = createAsyncThunk(
  "messaging/markMessagesRead",
  async (props: { conversationId: string; lastMessageId: string }) => {
    await markMessagesReadService(props.conversationId, props.lastMessageId);
    return props;
  },
);

export const searchMessages = createAsyncThunk(
  "messaging/searchMessages",
  async (query: string) => {
    const response = await searchMessagesService(query);
    return response;
  },
);

const messagingSlice = createSlice({
  name: "messagingSlice",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Contacts
    builder.addCase(getContacts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload.data.data;
    });
    builder.addCase(getContacts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      const data = action.payload.data || action.payload;
      state.currentUser = data;
    });

    builder.addCase(getConversations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload.data.data;
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Messages
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.activeConversationId = action.payload.conversationId;
      state.messages = action.payload.response.data.data;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create conversation
    builder.addCase(createConversation.fulfilled, (state, action) => {
      const newConversation = action.payload.data.data;
      const exists = state.conversations.find((c) => c.ID === newConversation.ID);
      if (!exists) {
        state.conversations.unshift(newConversation);
      }
      state.activeConversationId = newConversation.ID;
    });

    // Send message
    builder.addCase(sendMessage.pending, (state) => {
      state.sendingMessage = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.sendingMessage = false;
      state.messages.push(action.payload.data);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.sendingMessage = false;
      state.error = action.payload as string;
    });

    // Toggle favorite
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const conv = state.conversations.find(
        (c) => c.ID === action.payload.conversationId,
      );
      if (conv) {
        conv.is_favorite = action.payload.isFavorite;
      }
    });

    // Mark read
    builder.addCase(markMessagesRead.fulfilled, (state, action) => {
      const conv = state.conversations.find(
        (c) => c.ID === action.payload.conversationId,
      );
      if (conv) {
        conv.unread_count = 0;
      }
    });

    // Search
    builder.addCase(searchMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.data.data;
    });
    builder.addCase(searchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setActiveConversation,
  clearMessages,
  clearSearchResults,
  clearError,
} = messagingSlice.actions;
export default messagingSlice.reducer;
