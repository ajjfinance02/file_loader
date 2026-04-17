"use client"

import { useEffect, useState } from "react"
// import File from '@/components/File'

export default function Loader({redirect, redirectUrl, domain}) {


  return (
     <>
       <div className="loader-overlay">
           <div className="overlay"></div>
            <div className="spinner" />
        </div>
     </>

  )
}