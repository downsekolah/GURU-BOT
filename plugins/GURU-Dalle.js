import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*This command generates images from text prompts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`;

  try {
    m.reply('*Please wait, generating images...*');

    "const endpoint = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(text)}`;"
 https://github.com/Guru322/GURU-BOT/commit/a5fb877af91ff67d560c02ec4c93dee862420ce8#:~:text=const%20endpoint%20%3D%20%60https%3A//gurugpt.cyclic.app/dalle%3Fprompt%3D%24%7BencodeURIComponent(text)%7D%60%3B
    if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m);
      }
    } else {
      throw '*Image generation failed*';
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dalle', 'gen', 'gimg', 'openai2'];
export default handler;

