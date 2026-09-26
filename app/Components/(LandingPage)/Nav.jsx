import Button from '@/app/UI/buttons/Button';
import Button2 from '@/app/UI/buttons/Button2';
import Image from 'next/image';
import banner from "@/app/banner.png";
import React from 'react'

export default function Nav() {


  return (
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-15 w-15 items-center justify-center rounded-lg  shadow-teal-500/30 transition-transform hover:rotate-2">
            <Image
                alt='Momentum_monitor'
                width={200}
                height={200}
                src={banner} 
            />
             
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              Momentum Monitor
            </span>
          </div>
  
          <nav className="hidden items-center gap-8 md:flex">
            
              <a
                href={"#features"}
                className="group relative text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                Features
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-linear-to-r from-teal-500 to-sky-500 transition-all duration-300 group-hover:w-full" />
              </a>
         
          </nav>
  
          <div className="flex items-center gap-3">
            {/* <button 
            onClick={()=>router.push("/Login")}
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:block">
              Log in
            </button> */}
            <Button2 text={"Login"} url={"Login"} Txtsize={"sm"} />

            <Button text={"Signup"} url={"Signup"} Txtsize={"sm"} />
            {/* <button 
            onClick={()=>router.push("/Signup")}
            className="group flex items-center gap-1.5 rounded-lg bg-linear-to-r from-teal-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-teal-500/35">
              Sign Up
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button> */}
          </div>
        </div>
      </header>
    );
}
