"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="absolute left-5 top-5 z-50 flex items-center gap-2 rounded-lg
                       bg-white/80 px-3 py-2 text-sm font-medium text-teal-900
                       shadow-sm backdrop-blur-md transition-all duration-200
                       hover:-translate-x-0.5 hover:bg-white hover:shadow-md
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-teal-500/50"
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </button>
    )
}
