"use client";
import {
  getCourses,
  getSubject,
  getTrend,
} from "@/app/redux/grade/grade-slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useEffect } from "react";

export default function GradePage() {
  const dispatch = useAppDispatch();
  const { trend, courses, subjects } = useAppSelector((x) => x.grade);
  console.log(subjects);
  useEffect(() => {
    dispatch(getTrend({ filter: "2026" }));
    dispatch(getCourses());
    dispatch(getSubject({ filter: "2026" }));
  }, []);

  return <div>GradePage</div>;
}
