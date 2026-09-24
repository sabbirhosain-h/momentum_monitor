"use client"
import React, { useState } from "react";
import {
  Flame,
  Wallet,
  BookOpen,
  ArrowRight,
  Ruler,
  Weight,
  Calendar,
  Users,
} from "lucide-react";
import FitnessDareCard from "../UI/Cards/FitnessDareCard";
import StreakCard from "../UI/Cards/StreakCard";
import FormField from "../UI/(dbUI)/FormField";
import SelectField from "../UI/(dbUI)/SelectField";
import UnitField from "../UI/(dbUI)/UnitField";

// ============================================================================
// MOMENTUM MONITOR — MODULE 3: ONBOARDING (Screen 1 — Welcome + Profile Basics)
// Theme: light theme (matches the Landing Page / product surfaces).
// The dark Midnight Navy theme stays scoped to Auth only, per the design
// decision from Module 2 — this is a post-login product screen, so it
// inherits the light, energetic direction that was already approved.
//
// Layout: greeting header -> 3 streak cards (Fitness / Finance / Journal,
// each starting at day 0 with a comment) -> a personal info form
// (age, height, weight, gender) that feeds the rest of onboarding.
// ============================================================================

const TODAY = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function OnboardingWelcome() {
  const [profile, setProfile] = useState({
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleContinue() {
    const next = {};
    if (!profile.age) next.age = "Required";
    if (!profile.height) next.height = "Required";
    if (!profile.weight) next.weight = "Required";
    if (!profile.gender) next.gender = "Required";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      console.log("Profile basics:", profile);
      // Next: advance wizard step (target weight, finance cadence, UI prefs)
    }
  }

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
    <div className="min-h-screen w-full overflow-hidden  text-slate-900 antialiased ">
        

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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Tell us about yourself
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            This helps us tailor your fitness and progress targets. You can
            change it later.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <FormField
              id="age"
              label="Age"
              icon={<Calendar className="h-4 w-4" />}
              type="number"
              placeholder="28"
              value={profile.age}
              onChange={(v) => updateField("age", v)}
              error={errors.age}
            />

            <SelectField
              id="gender"
              label="Gender"
              icon={<Users className="h-4 w-4" />}
              value={profile.gender}
              onChange={(v) => updateField("gender", v)}
              error={errors.gender}
              options={[
                { value: "", label: "Select…" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
                { value: "prefer_not_to_say", label: "Prefer not to say" },
              ]}
            />

            <UnitField
              id="height"
              label="Height"
              icon={<Ruler className="h-4 w-4" />}
              placeholder="175"
              value={profile.height}
              onChange={(v) => updateField("height", v)}
              unit={profile.heightUnit}
              onUnitChange={(v) => updateField("heightUnit", v)}
              units={["cm", "ft"]}
              error={errors.height}
            />

            <UnitField
              id="weight"
              label="Weight"
              icon={<Weight className="h-4 w-4" />}
              placeholder="68"
              value={profile.weight}
              onChange={(v) => updateField("weight", v)}
              unit={profile.weightUnit}
              onUnitChange={(v) => updateField("weightUnit", v)}
              units={["kg", "lb"]}
              error={errors.weight}
            />
          </div>

          <button
            onClick={handleContinue}
            className="group mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-teal-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-teal-500/35 sm:w-auto"
          >
            Continue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
}

