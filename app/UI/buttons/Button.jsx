import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Button({ text, url, Txtsize}) {
    const router = useRouter();

    function handleClick() {
        router.push(`/${url}`)
    }
  return (
    <button 
    onClick={handleClick}
    className={`group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-teal-500 to-sky-500 px-5 py-3  text-${Txtsize} font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/40 sm:w-auto`}>

      {text}
      <ArrowRight className="h-4 wtransition-transformgroup-hover:translate-x-0.5" />

    </button>
  )
}