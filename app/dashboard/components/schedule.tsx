import ClockIcon from "@/app/components/icons/clock-icon";
import RoomIcon from "@/app/components/icons/room-icon";
import { useAppSelector } from "@/app/redux/hooks";
import { ISOtoTime } from "@/helper";

export default function ScheduleSection() {
  const { calendar, selectedDate, loading } = useAppSelector((x) => x.calendar);

  const dailySchedule =
    calendar?.filter((event) => {
      if (!selectedDate) return false;

      const selected = new Date(selectedDate);
      const selectedStart = new Date(selected.setHours(0, 0, 0, 0));
      const selectedEnd = new Date(selected.setHours(23, 59, 59, 999));

      const eventStart = new Date(event.StartAt);
      const eventEnd = new Date(event.EndAt);

      return (
        (eventStart >= selectedStart && eventStart <= selectedEnd) ||
        (eventEnd >= selectedStart && eventEnd <= selectedEnd) ||
        (eventStart <= selectedStart && eventEnd >= selectedEnd)
      );
    }) || [];

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Schedule</h3>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 no-scrollbar">
        {dailySchedule?.length > 0 ? (
          dailySchedule.map((sched, index) => (
            <div
              key={sched.ID}
              style={{ backgroundColor: `${sched.Color}30` }}
              className={`flex items-center gap-4 p-3 rounded-lg `}
            >
              <div className="flex-1">
                <button className="text-xs font-semibold text-black bg-white mb-1 py-1 px-2 rounded-md">
                  {sched.EventType.toUpperCase()}
                </button>
                <p className="font-semibold text-gray-900 mb-2">
                  {sched.Title}
                </p>
                <div
                  style={{ color: `${sched.Color}` }}
                  className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1">
                    <ClockIcon />
                    <span>
                      {ISOtoTime(sched.StartAt.toString())} -{" "}
                      {ISOtoTime(sched.EndAt.toString())}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RoomIcon />
                    <span>{sched.Location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500">There is no schedule for this day</p>
          </div>
        )}
      </div>
    </div>
  );
}
