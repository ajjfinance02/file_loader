"use client"

import { useEffect, useState } from "react"
// import File from '@/components/File'

export default function Loader({redirect, redirectUrl, domain}) {

  const [useFile, setUseFile] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setUseFile(false)
      if (redirect) {
        move()
      } else {
        rejected()
      }
    }, 4000)
  }, [])

  const move = () => {

    window.location = redirectUrl
  }

  const rejected = () => {
    window.location = domain
  }

  return (
     <>

       <div className="loader-overlay">
           <div class="overlay"></div>
            <div className="spinner" />
        </div>
      {/* {useFile ? (
            <div className="loader-overlay">
                <div className="spinner" />
            </div>
          ): (
            <File redirect={redirect} />
          )} */}
     </>

  )
}