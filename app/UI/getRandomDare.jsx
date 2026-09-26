"use client"
import React, { useEffect, useState } from "react";

const DARE_POOL = [
  "Do 20 push-ups before your next meal.",
  "Take a brisk 10-minute walk outside, no phone.",
  "Hold a plank for 60 seconds.",
  "Do 30 bodyweight squats.",
  "Stretch for 5 minutes before bed tonight.",
  "Climb the stairs instead of the elevator, all day.",
  "Do a 2-minute wall sit.",
  "Try 15 minutes of any workout you've never done before.",
  "Do 25 jumping jacks right now.",
  "Drink a full glass of water, then do 10 lunges per leg.",
  "Do a 5-minute stretch routine focused on your back.",
  "Try a 10-minute yoga flow before bed.",
  "Do 3 sets of 10 sit-ups spread through the day.",
  "Walk 3,000 extra steps today.",
];

function getRandomDare(exclude) {
  const pool = exclude ? DARE_POOL.filter((d) => d !== exclude) : DARE_POOL;
  return pool[Math.floor(Math.random() * pool.length)];
}

function formatCountdown(ms) {
  if (ms <= 0) return "0h 0m";
  const totalMinutes = Math.floor(ms / 60000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

const STORAGE_KEY = "momentum_fitness_dare";

export function useFitnessDare(intervalHours = 12) {
  const intervalMs = intervalHours * 60 * 60 * 1000;

  const [dare, setDare] = useState(null);
  const [nextRefreshAt, setNextRefreshAt] = useState(null);
  const [msLeft, setMsLeft] = useState(0);

  // Load or initialize on mount
  useEffect(() => {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      stored = null;
    }

    const now = Date.now();

    if (stored?.dare && stored?.timestamp && now - stored.timestamp < intervalMs) {
      setDare(stored.dare);
      setNextRefreshAt(stored.timestamp + intervalMs);
    } else {
      const newDare = getRandomDare(stored?.dare);
      const timestamp = now;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dare: newDare, timestamp }));
      setDare(newDare);
      setNextRefreshAt(timestamp + intervalMs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs]);

  // Tick every second; rotate the dare once time's up
  useEffect(() => {
    if (!nextRefreshAt) return;

    const tick = () => {
      const remaining = nextRefreshAt - Date.now();
      if (remaining <= 0) {
        const newDare = getRandomDare(dare);
        const timestamp = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ dare: newDare, timestamp }));
        setDare(newDare);
        setNextRefreshAt(timestamp + intervalMs);
        setMsLeft(intervalMs);
      } else {
        setMsLeft(remaining);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextRefreshAt, dare, intervalMs]);

  function refreshNow() {
    const newDare = getRandomDare(dare);
    const timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dare: newDare, timestamp }));
    setDare(newDare);
    setNextRefreshAt(timestamp + intervalMs);
  }

  const elapsed = nextRefreshAt ? intervalMs - msLeft : 0;
  const percentElapsed = nextRefreshAt ? Math.min(100, Math.max(0, (elapsed / intervalMs) * 100)) : 0;

  return {
    dare,
    timeLeftLabel: formatCountdown(msLeft),
    percentElapsed,
    refreshNow,
  };
}

