"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  getConversations,
  getMessages,
  sendMessage,
  toggleFavorite,
  markMessagesRead,
  getCurrentUser,
} from "@/app/redux/messaging/messaging-slice";
import ConversationList from "./components/conversation-list";
import ChatPanel from "./components/chat-panel";

export default function MessagePage() {
  const dispatch = useAppDispatch();
  const {
    conversations,
    messages,
    activeConversationId,
    currentUser,
    loading,
    sendingMessage,
  } = useAppSelector((x) => x.messaging);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getConversations());
  }, [dispatch]);

  const handleSelectConversation = (conversationId: string) => {
    dispatch(getMessages(conversationId));

    const conv = conversations.find((c) => c.ID === conversationId);
    if (conv && conv.unread_count > 0 && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      dispatch(
        markMessagesRead({
          conversationId,
          lastMessageId: lastMsg.ID,
        }),
      );
    }
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversationId) return;
    dispatch(
      sendMessage({
        conversation_id: activeConversationId,
        content,
        attachment_ids: [],
      }),
    );
  };

  const handleToggleFavorite = () => {
    if (!activeConversationId) return;
    const conv = conversations.find((c) => c.ID === activeConversationId);
    if (!conv) return;
    dispatch(
      toggleFavorite({
        conversationId: activeConversationId,
        isFavorite: !conv.is_favorite,
      }),
    );
  };

  const activeConversation =
    conversations.find((c) => c.ID === activeConversationId) || null;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Message</h1>
      </div>

      <div className="flex flex-1 min-h-0 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="w-[340px] flex-shrink-0">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            currentUser={currentUser}
            loading={loading && conversations.length === 0}
            onSelect={handleSelectConversation}
          />
        </div>

        <ChatPanel
          conversation={activeConversation}
          messages={messages}
          currentUser={currentUser}
          loading={loading && activeConversationId !== null}
          sendingMessage={sendingMessage}
          onSendMessage={handleSendMessage}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}
