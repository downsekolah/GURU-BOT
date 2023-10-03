import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*This command generates images from text prompts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`;

  try {
    m.reply('*Please wait, generating images...*');

    const endpoint = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(text)}&model=art`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.result && Array.isArray(data.result)) {
      for (let i = 0; i < Math.min(data.result.length, 2); i++) {
        const imageUrl = data.result[i];
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.buffer();
        await conn.sendFile(m.chat, imageBuffer, null, null, m);
      }
    } else {
      throw '*Image generation failed*';
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
  }
};

handler.help = ['dalle']
handler.tags = ['AI']
handler.command = ['ai2', 'dalle', 'gen', 'gimg', 'openai2'];
export default handler;

