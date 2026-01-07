import ClockIcon from "@/app/components/icons/clock-icon";
import RoomIcon from "@/app/components/icons/room-icon";
import { useAppSelector } from "@/app/redux/hooks";

import { ISOtoDay, ISOtoTime, ISOtoWeekday } from "@/helper";

export default function EventsSection({ title }: { title: string }) {
  const { events } = useAppSelector((x) => x.event);
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 no-scrollbar">
        {events?.length > 0 ? (
          events.map((ev, index) => (
            <div
              key={ev.id}
              className={`bg-[#F5F5F5] flex items-center gap-4 p-3 rounded-lg `}
            >
              <div className="p-1 flex flex-col items-center min-w-12.5 bg-white rounded-md">
                <p className="text-2xl font-bold text-gray-800">
                  {ISOtoDay(ev.start_time)}
                </p>
                <p className="text-xs text-gray-500">
                  {ISOtoWeekday(ev.start_time)}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  {ev.event_type}
                </p>
                <p className="font-semibold text-gray-900 mb-2">{ev.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <ClockIcon />
                    <span>
                      {ISOtoTime(ev.start_time)} - {ISOtoTime(ev.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RoomIcon />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500">No events.</p>
          </div>
        )}
      </div>
    </div>
  );
}
