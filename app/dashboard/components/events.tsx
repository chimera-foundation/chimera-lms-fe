const dummyEvent = [
  {
    id: 1,
    day: "Mon",
    date: "1",
    type: "Event",
    title: "Christmas Celebration",
    time: "07:00-08:00",
    place: "School Hall",
  },
  {
    id: 2,
    day: "Sun",
    date: "14",
    type: "Meeting",
    title: "New Curriculum Announcement",
    time: "09:30-10:00",
    place: "School Hall",
  },
  {
    id: 3,
    day: "Mon",
    date: "22",
    type: "Meeting",
    title: "Student Consultation",
    time: "09:30-10:00",
    place: "School Hall",
  },
  {
    id: 4,
    day: "Mon",
    date: "22",
    type: "Meeting",
    title: "Student Consultation",
    time: "09:30-10:00",
    place: "School Hall",
  },
  {
    id: 5,
    day: "Mon",
    date: "22",
    type: "Meeting",
    title: "Student Consultation",
    time: "09:30-10:00",
    place: "School Hall",
  },
];

export default function EventsSection({ title }: { title: string }) {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="overflow-y-auto flex flex-col gap-3 no-scrollbar">
        {dummyEvent.map((ev, index) => (
          <div
            key={ev.id}
            className={`bg-[#F5F5F5] flex items-center gap-4 p-3 rounded-lg `}
          >
            <div className="p-1 flex flex-col items-center min-w-12.5 bg-white rounded-md">
              <p className="text-2xl font-bold text-gray-800">{ev.date}</p>
              <p className="text-xs text-gray-500">{ev.day}</p>
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-600 mb-1">
                {ev.type}
              </p>
              <p className="font-semibold text-gray-900 mb-2">{ev.title}</p>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{ev.place}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
