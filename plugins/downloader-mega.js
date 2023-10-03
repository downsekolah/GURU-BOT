import { File } from "megajs"

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text) return m.reply(`Contoh:\n${usedPrefix + command} https://mega.nz/file/0FUA2bzb#vSu3Ud9Ft_HDz6zPvfIg_y62vE1qF8EmoYT3kY16zxo`);
        
        const file = File.fromURL(text);
        await file.loadAttributes();
        
        if (file.size >= 300000000) return m.reply('Error: ukuran file terlalu besar (Ukuran Max: 300MB)');
        
        m.reply(`*_Mohon tunggu beberapa menit..._*\n${file.name} sedang diunduh...`);
        
        const data = await file.downloadBuffer();
        
        // Menambahkan ekstensi yang didukung (zip, rar, 7z, jpg, png) ke dalam daftar
        if (/mp4/.test(file.name)) {
             conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
	m.react(done)
        } else {
            return m.reply('Error: Format file tidak didukung');
        }
    } catch (error) {
        return m.reply(`Error: ${error.message}`);
    }
}



handler.help = ["mega"]
handler.tags = ["downloader"]
handler.command = /^(mega)$/i
export default handler
