import fetch from 'node-fetch'
import GIFBufferToVideoBuffer from '../lib/Gifbuffer.js';

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Failed to get buffer", error);
    throw new Error("Failed to get buffer");
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
	
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
     if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @tag` 
     
    let user = global.db.data.users[who]
    let name = conn.getName(who) 
   let name2 = conn.getName(m.sender) 
   m.react(rwait)

  let rpat = await fetch(`https://api.waifu.pics/sfw/pat`)
    if (!rpat.ok) throw await rpat.text()
   let json = await rpat.json()
   let { url } = json
   const gifBuffer = await getBuffer(url)
   const gifToVideoBuffer = await GIFBufferToVideoBuffer(gifBuffer);


   conn.sendMessage(
     m.chat,
     { video: gifToVideoBuffer, caption: `(${name2}) pat ${name}`, gifPlayback: true, gifAttribution: 0 },
     { quoted: m }
   );
   
}

handler.help = ['pat @tag']
handler.tags = ['anime']
handler.command = /^(acariciar|pat)$/i


export default handler
