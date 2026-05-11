"use client";
import React, { useState, useMemo } from "react";
import { Conversation, Participant, CurrentUser } from "@/app/models/messaging";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentUser: CurrentUser | null;
  loading: boolean;
  onSelect: (conversationId: string) => void;
}

export default function ConversationList({
  conversations,
  activeConversationId,
  currentUser,
  loading,
  onSelect,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "favorites">("all");

  const getOtherParticipants = (participants: Participant[]) => {
    if (!currentUser) return participants;
    const others = participants.filter(
      (p) =>
        p.first_name !== currentUser.first_name ||
        p.last_name !== currentUser.last_name,
    );
    return others.length > 0 ? others : participants;
  };

  const getDisplayName = (conversation: Conversation) => {
    const others = getOtherParticipants(conversation.participants);
    return others.map((p) => `${p.first_name} ${p.last_name}`).join(", ");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredConversations = useMemo(() => {
    let list = conversations;

    if (filter === "unread") {
      list = list.filter((c) => c.unread_count > 0);
    } else if (filter === "favorites") {
      list = list.filter((c) => c.is_favorite);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((c) => {
        const name = getDisplayName(c).toLowerCase();
        return name.includes(q);
      });
    }

    return list;
  }, [conversations, filter, searchQuery, currentUser]);

  return (
    <div className="flex flex-col h-full bg-white rounded-l-xl border-r border-gray-200">
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-chimera-blue-50/60 border border-chimera-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chimera-blue-400 focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-chimera-blue-400"
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
        </div>

        <div className="flex gap-1.5 mt-3">
          {(["all", "unread", "favorites"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${filter === f
                ? "bg-chimera-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {f === "favorites" ? "Favorites" : f === "unread" ? "Unread" : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-400 text-sm">
            Loading conversations...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">
            No conversations found.
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const displayName = getDisplayName(conv);
            const others = getOtherParticipants(conv.participants);
            const isActive = activeConversationId === conv.ID;
            const avatarUrl = others[0]?.avatar_url;

            return (
              <button
                key={conv.ID}
                onClick={() => onSelect(conv.ID)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 ${isActive
                  ? "bg-chimera-blue-50"
                  : "hover:bg-gray-50"
                  }`}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-chimera-blue-200 flex items-center justify-center text-chimera-blue-700 text-sm font-bold flex-shrink-0">
                    {getInitials(displayName)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800 truncate">
                      {displayName}
                    </span>
                    <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0">
                      {formatTime(conv.UpdatedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-500 truncate">
                      {others[0]?.role && (
                        <span className="capitalize">{others[0].role}</span>
                      )}
                    </span>
                    {conv.unread_count > 0 && (
                      <span className="bg-chimera-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
