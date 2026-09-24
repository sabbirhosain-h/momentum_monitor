import { useRouter } from 'next/navigation';
import React from 'react'

export default function Button2({ text, url, Txtsize }) {
    const router = useRouter();
    
        function handleClick() {
            router.push(`/${url}`)
        }
    return (
        <button 
        onClick={handleClick}
        className={`w-full rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-${Txtsize} font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:w-auto`}>
            {text}
        </button>
    )
}
