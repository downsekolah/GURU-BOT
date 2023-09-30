import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
	if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = await sfileDl(text)
		if (!res) throw 'Error :/'
		await m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._')
		conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype: res.mimetype }, { quoted: m })
		if (/mp4/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "video/mp4", filename: `${file.name}.mp4` }, { quoted: m });
        } else if (/pdf/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/pdf", filename: `${file.name}.pdf` }, { quoted: m });
        } else if (/zip/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/zip", filename: `${file.name}.zip` }, { quoted: m });
        } else if (/rar/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/x-rar-compressed", filename: `${file.name}.rar` }, { quoted: m });
        } else if (/7z/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/x-7z-compressed", filename: `${file.name}.7z` }, { quoted: m });
        } else if (/jpg|jpeg/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "image/jpeg", filename: `${file.name}.jpg` }, { quoted: m });
        } else if (/png/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "image/png", filename: `${file.name}.png` }, { quoted: m });
		} else if (/hc/.test(file.name)) }
		await conn.sendMessage(m.chat, { document: data, mimetype: "document/hc", filename: `${file.name}.hc` }, { quoted:m });
	} else if (text) {
		let [query, page] = text.split`|`
		let res = await sfileSearch(query, page)
		if (!res.length) throw `Query "${text}" not found :/`
		res = res.map((v) => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`
		m.reply(res)
	} else throw 'Input Query / Sfile Url!'
}
handler.help = handler.alias = ['sfile']
handler.tags = ['downloader']
handler.command = /^(sfile)$/i
handler.limit = true
handler.register = true
export default handler

async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}

async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}
