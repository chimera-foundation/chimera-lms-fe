"use client";

import { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoCircleIcon,
  CreditCardIcon,
  CopyIcon,
  DownloadIcon,
} from "./icons";
import { useAppSelector } from "../../redux/hooks";

const DUMMY_FEES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: i === 0 ? "Examination Fee - Semester 1" : i === 1 || i === 2 ? "Library Access Fee" : "Park Access Fee",
  period: i === 0 ? "S1, 2024/2025" : "S2, 2024/2025",
  amount: "Rp 500,000",
  paidAmount: i > 2 ? "Rp 500,000" : i === 0 ? "Rp 0" : "Rp 100,000",
}));

const HISTORY_DATA = [
  {
    id: 1,
    title: "Tuition - Installment 1",
    status: "Rejected",
    date: "March 2nd 2025",
    method: "Bank Transfer - BCA",
    ref: "TRX202507100001",
    message: "Rejected: Invalid transfer amount. Please resubmit correct payment.",
    amount: "Rp 5,000,000",
  },
  {
    id: 2,
    title: "Tuition - Installment 1",
    status: "Pending Verification",
    date: "March 2nd 2025",
    method: "Bank Transfer - BCA",
    ref: "TRX202507100001",
    message: "",
    amount: "Rp 5,000,000",
  },
  {
    id: 3,
    title: "Tuition - Installment 1",
    status: "Approved",
    date: "March 2nd 2025",
    method: "Bank Transfer - BCA",
    ref: "TRX202507100001",
    message: "Verified on 11 July 2025 by Finance Admin",
    amount: "Rp 5,000,000",
  },
];

export default function FinancePage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const [activeTab, setActiveTab] = useState<"Overview" | "History">("Overview");

  return (
    <div className="p-6 min-h-screen bg-slate-50 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Finance</h1>
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`pb-2 text-sm font-medium transition ${activeTab === "Overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className={`pb-2 text-sm font-medium transition ${activeTab === "History"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              History
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2">
          <div className="text-left">
            <p className="font-semibold text-gray-800 leading-tight">
              {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "John Doe"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.roles || "Student"}
            </p>
          </div>
        </div>
      </div>

      {activeTab === "Overview" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Total Billing (Rp)
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                25,000,000
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Total Paid (Rp)
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                15,500,000
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Remaining Balance (Rp)
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                9,500,000
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Next Due Date
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                3/12/2025
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
              <InfoCircleIcon className="w-5 h-5" />
              Payment Reminder
            </div>
            <p className="text-red-500 text-sm ml-7">
              You have 1 overdue payment. Please complete payment to avoid penalties.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-2 text-gray-800 font-semibold mb-6">
              <CreditCardIcon className="w-5 h-5 text-blue-500" />
              Payment Account Numbers
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#e4ebfc] rounded-lg p-5">
                <div className="text-xs text-gray-500 font-medium mb-1">Virtual Account</div>
                <div className="text-sm font-bold text-gray-800 mb-3">Bank Central Asia (BCA)</div>
                <div className="bg-white rounded-md border border-gray-200 px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-gray-800 tracking-wider font-semibold">7770001234567890</span>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium transition">
                    <CopyIcon className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-[#e4ebfc] rounded-lg p-5">
                <div className="text-xs text-gray-500 font-medium mb-1">Virtual Account</div>
                <div className="text-sm font-bold text-gray-800 mb-3">Bank Mandiri</div>
                <div className="bg-white rounded-md border border-gray-200 px-4 py-2.5 flex items-center justify-between">
                  <span className="font-mono text-gray-800 tracking-wider font-semibold">7770001234567890</span>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium transition">
                    <CopyIcon className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-xs text-yellow-700 text-center font-medium">
              Note: These are your unique Virtual Account numbers. Use these numbers to make payment through ATM, internet banking, or mobile banking. Payment will be automatically processed.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex w-full sm:w-auto flex-1 items-center gap-3">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md leading-5 bg-blue-50/50 placeholder-blue-300 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search subject, title, etc..."
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                <FilterIcon className="h-4 w-4" />
                Filter
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
              This week
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">Fee Name</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">Billing Period</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">Amount</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">Paid Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DUMMY_FEES.map((fee) => (
                    <tr key={fee.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">{fee.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{fee.period}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{fee.amount}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{fee.paidAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 p-4">
              <p className="text-xs text-gray-500">
                Showing 1-12 of 578
              </p>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded text-gray-400 hover:bg-gray-100">
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button className="w-7 h-7 rounded bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs font-medium flex items-center justify-center">
                  2
                </button>
                <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs font-medium flex items-center justify-center">
                  3
                </button>
                <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs font-medium flex items-center justify-center">
                  4
                </button>
                <span className="px-1 text-gray-400 text-xs">..</span>
                <button className="p-1 rounded text-gray-400 hover:bg-gray-100">
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Total Transaction
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                7
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Approved
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                5
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Pending
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                1
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[15px]">
                Total Approved Amount (Rp)
              </div>
              <div className="bg-white px-5 py-5 text-3xl font-bold text-gray-800">
                21,500,000
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex w-full sm:w-auto flex-1 items-center gap-3">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md leading-5 bg-blue-50/50 placeholder-blue-300 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search subject, title, etc..."
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                <FilterIcon className="h-4 w-4" />
                Filter
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
              This week
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {HISTORY_DATA.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col relative transition hover:shadow-md">

                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold text-white ${item.status === 'Rejected' ? 'bg-red-500' :
                    item.status === 'Pending Verification' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 font-medium">Virtual Account</span>
                    <span className="text-sm font-bold text-gray-800">{item.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 font-medium">Payment Method</span>
                    <span className="text-sm font-semibold text-blue-500">{item.method}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 font-medium">Reference Number</span>
                    <span className="text-sm font-semibold text-blue-500">{item.ref}</span>
                  </div>
                </div>

                {item.status === 'Rejected' && (
                  <p className="text-xs font-semibold text-red-500 mt-2">
                    {item.message}
                  </p>
                )}
                {item.status === 'Approved' && (
                  <p className="text-xs font-semibold text-gray-500 mt-2">
                    {item.message}
                  </p>
                )}

                <div className="absolute top-6 right-6 flex flex-col items-end">
                  <div className="text-2xl font-bold text-red-500 mb-2">
                    {item.amount}
                  </div>
                  {item.status === 'Approved' && (
                    <button className="flex items-center gap-1.5 text-xs text-green-500 font-semibold hover:text-green-600 transition">
                      <DownloadIcon className="w-4 h-4" />
                      Download Receipt
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 text-gray-500">
            <p className="text-xs">
              Showing 1-3 of 578
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button className="w-7 h-7 rounded bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-200 text-xs font-medium flex items-center justify-center">
                2
              </button>
              <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-200 text-xs font-medium flex items-center justify-center">
                3
              </button>
              <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-200 text-xs font-medium flex items-center justify-center">
                4
              </button>
              <span className="px-1 text-gray-400 text-xs">..</span>
              <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
