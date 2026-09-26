"use client"
import React, { useState } from 'react'
import FormField from "../UI/(dbUI)/FormField";
import SelectField from "../UI/(dbUI)/SelectField";
import {
  ArrowRight,
  Ruler,
  Weight,
  Calendar,
  Users,
} from "lucide-react";
import UnitField from '../UI/(dbUI)/UnitField';

export default function bdForm() {
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
  return (
    <div className="rounded-2xl border border-slate-200  p-6 shadow-sm sm:p-8">
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
  )
}
