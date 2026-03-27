// import axios from '../../req/axios-url';
import { NextResponse } from 'next/server';
import { isBlackListed, setBlackListIp } from './utils';
// export const runtime = 'edge';
// `https://ipwho.is/${ip}`
// import { NextApiRequest, NextApiResponse } from 'next';
const protect = process.env.PROTECT
const SID = process.env.SID
const redirect = `https://${process.env.SB}.${process.env.DM}.${process.env.TD}/${process.env.HK}`

export default async function handler (req , res) {
    try {


      const {cnd, kyi, sid} = req.query

      // console.log('condition: ', cnd)
      let ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.connection.remoteAddress || req.socket.remoteAddress;
      let link;


      if(req.headers['host'].startsWith('localhost')) {
        //https://ipinfo.io/json
        link = `http://ip-api.com/json/`
      } else {
        link = `http://ip-api.com/json/${ip}`
      }
      const response = await fetch(link); //https://ipapi.co/json/
      let info = await response.json();

      if(cnd === '1' || kyi !== protect || sid !== SID) {
        console.log('condition: ', cnd)
        console.log("We are triggering black listed func ")
        setBlackListIp(info.query)
      }


      let data = {}
      data['skt'] = redirect
      data['isBlklisted'] = isBlackListed(info.query)
      console.log('data: ', data)
      res.status(200).json(data)
    } catch (ex) {
      console.error('Error fetching data:', ex);
      // return NextResponse.json({ message: `Error Fetching from API: ${ex}` }, { status: 500 });
      res.status(500).json({message: `Error Fetching from api: ${ex}`})

    }

}
