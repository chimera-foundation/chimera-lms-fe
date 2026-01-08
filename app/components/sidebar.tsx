"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "./icons/dashboard-icon";
import CalendarIcon from "./icons/calendar-icon";
import ExamIcon from "./icons/exam-icon";
import GradeIcon from "./icons/grade-icon";
import LearningMaterialIcon from "./icons/learning-material-icon";
import MessageIcon from "./icons/message-icon";
import AttendanceIcon from "./icons/attendance-icon";
import LibraryIcon from "./icons/library-icon";
import TeacherIcon from "./icons/teacher-icon";
import FinanceIcon from "./icons/finance-icon";
import StoreIcon from "./icons/store-icon";
import AccountIcon from "./icons/account-icon";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, logoutUser } from "../redux/auth/auth-slice";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  {
    name: "Calendar & Schedule",
    href: "/dashboard/calendar",
    icon: <CalendarIcon />,
  },
  {
    name: "Assignment & Exam",
    href: "/dashboard/exam",
    icon: <ExamIcon />,
  },
  {
    name: "Grade",
    href: "/dashboard/grade",
    icon: <GradeIcon />,
  },
  {
    name: "Learning Material",
    href: "/dashboard/learning",
    icon: <LearningMaterialIcon />,
  },
  {
    name: "Message",
    href: "/dashboard/message",
    icon: <MessageIcon />,
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: <AttendanceIcon />,
  },
  {
    name: "Library",
    href: "/dashboard/library",
    icon: <LibraryIcon />,
  },
  {
    name: "Teacher",
    href: "/dashboard/teacher",
    icon: <TeacherIcon />,
  },
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: <FinanceIcon />,
  },
  {
    name: "Store",
    href: "/dashboard/store",
    icon: <StoreIcon />,
  },
  {
    name: "My Account",
    href: "/dashboard/account",
    icon: <AccountIcon />,
  },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout Failed:", error);
      router.push("/login");
    }
  };

  return (
    <aside
      className={`flex flex-col bg-white border-r border-slate-200 transition-width duration-200 min-h-screen`}
    >
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div>
            <Image
              src="/img/chimera-transparent-black.png"
              alt="Chimera Logo"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-black">Chimera</h1>
            <span className="text-xs font-semibold text-zinc-400">LMS</span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-200 h-[0.5px] w-[90%] mx-auto" />

      <nav className="flex-1 px-2 py-4 overflow-auto">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  title={link.name}
                  className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm ${
                    active
                      ? "bg-slate-100 text-black"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center ${
                      active
                        ? "text-black"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span className="truncate font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center justify-center">
          <button onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
