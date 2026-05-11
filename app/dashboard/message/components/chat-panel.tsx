"use client";
import React, { useState, useRef, useEffect } from "react";
import { Message, Conversation, Participant, CurrentUser } from "@/app/models/messaging";

interface ChatPanelProps {
  conversation: Conversation | null;
  messages: Message[];
  currentUser: CurrentUser | null;
  loading: boolean;
  sendingMessage: boolean;
  onSendMessage: (content: string) => void;
  onToggleFavorite: () => void;
}

export default function ChatPanel({
  conversation,
  messages,
  currentUser,
  loading,
  sendingMessage,
  onSendMessage,
  onToggleFavorite,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getCurrentUserId = (participants: Participant[]) => {
    if (!currentUser) return null;
    const me = participants.find(
      (p) =>
        p.first_name === currentUser.first_name &&
        p.last_name === currentUser.last_name,
    );
    return me?.user_id || null;
  };

  const getOtherParticipants = (participants: Participant[]) => {
    if (!currentUser) return participants;
    const others = participants.filter(
      (p) =>
        p.first_name !== currentUser.first_name ||
        p.last_name !== currentUser.last_name,
    );
    return others.length > 0 ? others : participants;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateSeparator = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chimera-blue-50/40 rounded-r-xl">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-chimera-blue-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-chimera-blue-400 text-lg font-medium">
            Start your conversation
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Select a conversation from the list
          </p>
        </div>
      </div>
    );
  }

  const others = getOtherParticipants(conversation.participants);
  const displayName = others
    .map((p) => `${p.first_name} ${p.last_name}`)
    .join(", ");
  const avatarUrl = others[0]?.avatar_url;

  const groupedMessages: { date: string; messages: Message[] }[] = [];
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
  );

  sortedMessages.forEach((msg) => {
    const dateKey = new Date(msg.CreatedAt).toDateString();
    const existingGroup = groupedMessages.find(g => g.date === dateKey);
    if (existingGroup) {
      existingGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateKey, messages: [msg] });
    }
  });

  return (
    <div className="flex-1 flex flex-col bg-chimera-blue-50/40 rounded-r-xl">
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 rounded-tr-xl">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-chimera-blue-200 flex items-center justify-center text-chimera-blue-700 text-sm font-bold">
              {getInitials(displayName)}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {displayName}
            </h3>
            {others[0]?.is_online && (
              <span className="text-[11px] text-green-500 font-medium">
                Online
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={conversation.is_favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`w-5 h-5 ${conversation.is_favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">Loading messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">
              No messages yet. Say hello!
            </span>
          </div>
        ) : (
          groupedMessages.map((group, index) => (
            <div key={`${group.date}-${index}`}>
              <div className="flex items-center justify-center my-4">
                <span className="px-3 py-1 bg-white/80 rounded-full text-[11px] text-gray-500 font-medium shadow-sm">
                  {formatDateSeparator(group.messages[0].CreatedAt)}
                </span>
              </div>
              {group.messages.map((msg) => {
                const myUserId = getCurrentUserId(conversation.participants);
                const isSent = myUserId ? msg.sender_id === myUserId : false;
                return (
                  <div
                    key={msg.ID}
                    className={`flex mb-3 ${isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${isSent ? "order-2" : "order-1"}`}
                    >
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isSent
                          ? "bg-chimera-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                          }`}
                      >
                        {msg.content}
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 ${isSent ? "justify-end" : "justify-start"}`}
                      >
                        <span className="text-[11px] text-gray-400">
                          {formatMessageTime(msg.CreatedAt)}
                        </span>
                        {isSent && msg.status === "sent" && (
                          <svg
                            className="w-3.5 h-3.5 text-chimera-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-200 rounded-br-xl">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chimera-blue-400 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || sendingMessage}
            className="p-2 rounded-lg bg-chimera-blue-500 hover:bg-chimera-blue-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
