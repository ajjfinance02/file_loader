import fs from 'fs';
import path from 'path';

export function setBlackListIp(ip) {
  console.log('[We are setting the blacklisted ip]')
  const blacklisted = getAllBlacklists()
  const filePath = path.join(process.cwd(), 'blacklists.json');

  if(!blacklisted.includes(ip)){
    blacklisted.push(ip)
    fs.writeFileSync(filePath, JSON.stringify(blacklisted, null, 2));

  }

}

export function unSetBlackListIp(ip) {
  let blacklisted = getAllBlacklists()
  const filePath = path.join(process.cwd(), 'blacklists.json');
  if(blacklisted.includes(ip)) {
   blacklisted = blacklisted.filter(item => item !== ip)
   fs.writeFileSync(filePath, JSON.stringify(blacklisted, null, 2));
  }
}

export function getAllBlacklists() {
  const filePath = path.join(process.cwd(), 'blacklists.json');
  const blacklisted = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return blacklisted
}

export function isBlackListed(ip) {
  const blacklisted = getAllBlacklists()

  if(blacklisted.includes(ip)){
    return true
  }

  return false

}
