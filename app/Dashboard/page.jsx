import React from "react";
import {
  Flame,
  Wallet,
  BookOpen,
} from "lucide-react";
import FitnessDareCard from "../UI/Cards/FitnessDareCard";
import StreakCard from "../UI/Cards/StreakCard";
import DbForm from "./DbForm";

const TODAY = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export const metadata = {
  title: "M.M. | Dashboard",
  description: "Momentum Monitor pulls your finances, fitness, and daily journal into a single calm dashboard",
};
export default function OnboardingWelcome() {

  const streaks = [
    {
      key: "fitness",
      icon: <Flame className="h-5 w-5" />,
      label: "Fitness",
      color: "teal",
      comment: "Every streak starts with day one.",
      day: 2,
    },
    {
      key: "finance",
      icon: <Wallet className="h-5 w-5" />,
      label: "Finance",
      color: "amber",
      comment: "Track it once, and it gets easier daily.",
      day: 2,
    },
    {
      key: "journal",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Journal",
      color: "sky",
      comment: "One line today is enough to begin.",
      day:4,
    },
  ];

  return (
    <div className="p-4 sm:p-8 bg-linear-to-br from-teal-100 via-white to-sky-200 min-h-screen w-full overflow-hidden  text-slate-900 antialiased ">
        

      <div className="mx-auto ">
        
        {/* Brand mark */}
        {/* <div className="mb-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-sky-500">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">
            Momentum Monitor
          </span>
        </div> */}

        {/* Greeting */}
        <div className="mt-15 sm:mt-1 mb-10">
          <p className="text-sm font-medium text-teal-600">{TODAY}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome, Hasib.
          </h1>
          <p className="mt-2 max-w-md text-slate-600">
            Let's set up your first day of momentum — starting with three
            trackers that'll grow with you.
          </p>
        </div>

        {/* custom dare for use */}
        <div className="mb-8">
            <FitnessDareCard/>
        </div>

        {/* 3 streak cards */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {streaks.map((s) => (
            <StreakCard key={s.key} icon={s.icon} label={s.label} color={s.color} comment={s.comment} day={s.day} />
          ))}
        </div>

        {/* Personal info form */}
        <DbForm></DbForm>

      </div>
    </div>
  );
}

