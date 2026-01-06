import { useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getOrdinalSuffix(day)} ${year}, ${time}`;
};

export default function Announcements() {
  const { announcement } = useAppSelector((x) => x.announcement);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Announcement</h2>
      <div className="flex gap-6 overflow-x-auto max-h-96 lg:w-full w-[680px] no-scrollbar">
        {announcement.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-80 h-96 shrink-0"
          >
            <div className="w-full h-36 flex items-center justify-center relative">
              <Image
                src={announcement.image_url}
                alt="Chimera Logo"
                fill={true}
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {announcement.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {formatDate(announcement.published_at)}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-6">
                {announcement.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
