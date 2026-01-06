import ClockIcon from "@/app/components/icons/clock-icon";
import RoomIcon from "@/app/components/icons/room-icon";
import { useAppSelector } from "@/app/redux/hooks";
import { ISOtoTime } from "@/helper";

export default function ScheduleSection() {
  const { daily_schedule, loadingDailySchedule } = useAppSelector(
    (x) => x.dashboard
  );

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Schedule</h3>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 no-scrollbar">
        {daily_schedule?.length > 0 ? (
          daily_schedule.map((sched, index) => (
            <div
              key={sched.id}
              className={`bg-[#F5F5F5] flex items-center gap-4 p-3 rounded-lg `}
            >
              {/* <div className="p-1 flex flex-col items-center min-w-12.5 bg-white rounded-md">
              <p className="text-2xl font-bold text-gray-800">{sched.date}</p>
              <p className="text-xs text-gray-500">{sched.day}</p>
            </div> */}

              <div className="flex-1">
                <button className="text-xs font-semibold text-black bg-white mb-1 py-1 px-2 rounded-md">
                  {sched.type}
                </button>
                <p className="font-semibold text-gray-900 mb-2">
                  {sched.title}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <ClockIcon />
                    <span>
                      {ISOtoTime(sched.start_time)} -{" "}
                      {ISOtoTime(sched.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RoomIcon />
                    <span>{sched.location}</span>
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
