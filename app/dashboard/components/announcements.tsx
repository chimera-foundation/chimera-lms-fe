import Image from "next/image";

const announcementData = [
  {
    id: 1,
    title: "Weather Alert Announcement",
    date: "March 2nd 2025, 07.00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam aliquid possimus aliquam accusamus vero nobis excepturi quisquam, dolorem qui nisi quod voluptatibus quidem quae nihil animi et assumenda ratione.",
    image: "",
    comments: 42,
    likes: 281,
    shares: 121,
  },
  {
    id: 2,
    title: "Reminder About School Rules",
    date: "March 3rd 2025, 07.00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam aliquid possimus aliquam accusamus vero nobis excepturi quisquam, dolorem qui nisi quod voluptatibus quidem quae nihil animi et assumenda ratione.",
    image: "",
  },
  {
    id: 3,
    title: "Morning Announcement",
    date: "March 3rd 2025, 07.00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam aliquid possimus aliquam accusamus vero nobis excepturi quisquam, dolorem qui nisi quod voluptatibus quidem quae nihil animi et assumenda ratione.",
    image: "",
  },
  {
    id: 4,
    title: "Morning Announcement",
    date: "March 3rd 2025, 07.00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam aliquid possimus aliquam accusamus vero nobis excepturi quisquam, dolorem qui nisi quod voluptatibus quidem quae nihil animi et assumenda ratione.",
    image: "",
  },
  {
    id: 5,
    title: "Morning Announcement",
    date: "March 3rd 2025, 07.00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam aliquid possimus aliquam accusamus vero nobis excepturi quisquam, dolorem qui nisi quod voluptatibus quidem quae nihil animi et assumenda ratione.",
    image: "",
  },
];

export default function Announcements() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Announcement</h2>
      <div className="flex gap-6 overflow-x-auto max-h-96 lg:w-full w-[680px] no-scrollbar">
        {announcementData.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-80 h-96 shrink-0"
          >
            <div className="w-full h-36 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-white/60 rounded-lg flex items-center justify-center">
                <Image
                  src="/img/chimera-transparent-black.png"
                  alt="Chimera Logo"
                  width={80}
                  height={80}
                />
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {announcement.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{announcement.date}</p>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-6">
                {announcement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
