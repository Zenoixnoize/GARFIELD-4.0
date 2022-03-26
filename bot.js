/*COPYRIGHT (C) 2022 CODED BY NOIZE */

const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./Aurora/');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./X-nodes/sql/greetings");
const axios = require('axios');
const got = require('got');

//CODED BY THARINDU LIYANAGE
const AuroraDB = config.DATABASE.define('GARFIELD-6.0', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./X-nodes/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./X-nodes/sql/' + plugin);
    }
});

const plugindb = require('./X-nodes/sql/plugin');
var OWN = { ff: '94711502119' }
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function Aurora () {
    await config.DATABASE.sync();
    var StrSes_Db = await AuroraDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
// CODED BY THARINDU LIYANAGE
    const conn = new WAConnection();
    conn.version = [3,2147,14];
    const Session = new StringSession();
    
    conn.browserDescription = ["GARFIELD BOT BY NOIZE(SECURED)", "ZENOI", '6.0.0']


    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('Login Information Updated ✅')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await AuroraDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('GARF')}${chalk.blue.bold('FIELD')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('🐼 Connecting to WhatsApp... Please wait')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('Login Successful ✅')
        );

        console.log(
            chalk.blueBright.italic('🛰️️ Connecting to Garfield Server...')
        );

        var X-nodes = await plugindb.PluginDB.findAll();
        X-nodes.map(async (plugin) => {
            if (!fs.existsSync('./X-nodes/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./X-nodes/' + plugin.dataValues.name + '.js', response.body);
                    require('./X-nodes/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('📡  Installing X-nodes..')
        );

        fs.readdirSync('./X-nodes').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./X-nodes/' + plugin);
            }
        });
// PLUGGINS SUCCESS CODED BY THARINDU LIYANAGE
        console.log(
            chalk.green.bold('Successfully connected X-nodes server ☁️')
       );
        
        console.log(
            chalk.blueBright.italic('Garfield working now 🐼')
        );
        
         if (config.LANG == 'EN') {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: `*𝗚𝗔𝗥𝗙𝗜𝗘𝗟𝗗 𝗦𝗧𝗔𝗥𝗧𝗘𝗗  🐼* \n\n *𝗘𝗻𝗷𝗼𝘆 𝗻𝗼𝘄 💌*  \n *𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲-* ${conn.user.name} \n *GARFIELD  v6.0* \n *𝗗𝗲𝗽𝗹𝗼𝘆𝗲𝗿 𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 🐼* \n🅾️ You must place a dot(.) at the beginning of the command \n🅾️ The letters in the command should be lowercase \n *🅾️ This will stop after about 22 days. That's because you are in the heroku free version. Or you have to pay but do not. By remake you can easily deploy and use this* \n\n\n\n*𝗛𝗼𝘄 𝘁𝗼 𝗴𝗲𝘁 𝗺𝗲𝗻𝘂 💬*\n🐼  .𝗺𝗲𝗻𝘂  \n🅾️ You can easily and quickly create this for anyone without any programming knowledge\n\n\n\n *𝗚𝗔𝗥𝗙𝗜𝗘𝗟𝗗 𝗟𝗔𝗧𝗘𝗦𝗧 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 💬* \nℹ️ Garfield Bot is a free open source program  \nℹ️ This does nothing for your privacy \nℹ️ Developers do not get any benefit from this. Only self-satisfaction is obtained \nℹ️ This is updated and developed day by day \nℹ️ You can also get this from the telegram - https://t.me/ipandx \nℹ️ You cant get obscene stuff out of this \n\n*𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙈𝙀𝙉𝙏* \n\n *ℹ️ Follow Us* \n https://www.facebook.com/garfieldbots/ \n\n.        *NOIZE DEVELOPMENT*`});
             
         } else if (config.LANG == 'SI') {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: `*𝗘𝗻𝗷𝗼𝘆 𝗻𝗼𝘄 💌*  ${conn.user.name} \n *GARFIELD  v6.0* \n *𝗗𝗲𝗽𝗹𝗼𝘆𝗲𝗿 𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 🐼* \n🅾️ You must place a dot(.) at the beginning of the command \n🅾️ The letters in the command should be lowercase \n *🅾️ This will stop after about 22 days. That's because you are in the heroku free version. Or you have to pay but do not. By remake you can easily deploy and use this* \n\n\n\n*𝗛𝗼𝘄 𝘁𝗼 𝗴𝗲𝘁 𝗺𝗲𝗻𝘂 💬*\n🐼  .𝗺𝗲𝗻𝘂  \n🅾️ You can easily and quickly create this for anyone without any programming knowledge\n\n\n\n *𝗚𝗔𝗥𝗙𝗜𝗘𝗟𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝗦𝗜𝗫 💬* \nℹ️ Garfield Bot is a free open source program  \nℹ️ This does nothing for your privacy \nℹ️ Developers do not get any benefit from this. Only self-satisfaction is obtained \nℹ️ This is updated and developed day by day \nℹ️ You can also get this from the telegram - https://t.me/ipandx \nℹ️ You cant get obscene stuff out of this \n\n*𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙈𝙀𝙉𝙏* \n\n *ℹ️ Follow Us* \n https://www.facebook.com/garfieldbots/ \n\n.        *NOIZE DEVELOPMENT*`});
             
         } else {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: `222222`});
        }
     });
    
// LOGIN MESSAGE CODED BY THARINDU LIYANAGE
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            if (conn.user.jid.startsWith('90')) { 
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('994')) { 
                var ov_time = new Date().toLocaleString('AZ', { timeZone: 'Asia/Baku' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('94')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Asia/Colombo' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('351')) { 
                var ov_time = new Date().toLocaleString('PT', { timeZone: 'Europe/Lisbon' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('75')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('RU', { timeZone: 'Europe/Kaliningrad' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('91')) { 
                var ov_time = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('62')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('ID', { timeZone: 'Asia/Jakarta' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('49')) { 
                var ov_time = new Date().toLocaleString('DE', { timeZone: 'Europe/Berlin' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('61')) {  
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('AU', { timeZone: 'Australia/Lord_Howe' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('55')) { 
                var ov_time = new Date().toLocaleString('BR', { timeZone: 'America/Noronha' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('33')) {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('FR', { timeZone: 'Europe/Paris' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('34')) { 
                var ov_time = new Date().toLocaleString('ES', { timeZone: 'Europe/Madrid' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('44')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('GB', { timeZone: 'Europe/London' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('39')) {  
                var ov_time = new Date().toLocaleString('IT', { timeZone: 'Europe/Rome' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('7')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('KZ', { timeZone: 'Asia/Almaty' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('998')) {  
                var ov_time = new Date().toLocaleString('UZ', { timeZone: 'Asia/Samarkand' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('993')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('TM', { timeZone: 'Asia/Ashgabat' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
            else {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('EN', { timeZone: 'America/New_York' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\nGARFIELD BY NOIZE PROJECTS '
                await conn.setStatus(biography)
            }
        }
    }, 7890);
// AUTO BIO◽◽◽◽◽    
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
         
        while (getGMTh == 19 && getGMTm == 1) {
            var announce = ''
            if (config.LANG == 'EN') announce = ' ```GARFIELD 6.5 VERSION RELEASING SOON``` '
            
            let video = 'https://i.ibb.co/qmR14hQ/Pics-Art-22-03-18-19-34-01-459.png'
            let image = 'https://i.ibb.co/qmR14hQ/Pics-Art-22-03-18-19-34-01-459.png'
            
            if (video.includes('http') || video.includes('https')) {
                var VID = video.split('youtu.be')[1].split(' ')[0].replace('/', '')
                var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['1080p','720p', '480p', '360p', '240p', '144p'].map(() => true)});
                yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));
                yt.on('end', async () => {
                    return await conn.sendMessage(conn.user.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {caption: announce, mimetype: Mimetype.mp4});
                });
            } else {
                if (image.includes('http') || image.includes('https')) {
                    var imagegen = await axios.get(image, { responseType: 'arraybuffer'})
                    return await conn.sendMessage(conn.user.jid, Buffer.from(imagegen.data), MessageType.image, { caption: announce })
                } else {
                    return await conn.sendMessage(conn.user.jid, announce, MessageType.text)
                }
            }
        }
    }, 50000);
 // ANNOUNCEMENT CODED BY THARINDU LIYANAGE
    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
// NO ONLINE CODED BY THARINDU LIYANAGE

        if (config.GANSTYLE == 'pp' || config.GANSTYLE == 'Pp' || config.GANSTYLE == 'PP' || config.GANSTYLE == 'pP' ) {
            if (msg.messageStubType === 32 || msg.messageStubType === 28) {
                    // Thanks to Lyfe
                    var gb = await getMessage(msg.key.remoteJid, 'goodbye');
                    if (gb !== false) {
                        let pp
                        try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                        await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                        await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, {caption:  gb.message });  });

                    }
                    return;
                } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
                    // welcome
                    var gb = await getMessage(msg.key.remoteJid);
                    if (gb !== false) {
                       let pp
                        try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                        await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                        await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, {caption:  gb.message }); });
                    }
                    return;
                }
            }
            else if (config.GANSTYLE == 'image' || config.GANSTYLE == 'IMAGE' || config.GANSTYLE == 'IMAGE' || config.GANSTYLE == 'Image' ) {
            if (msg.messageStubType === 32 || msg.messageStubType === 28) {
                    
                    var gb = await getMessage(msg.key.remoteJid, 'goodbye');
                    if (gb !== false) {
                        var tn = await axios.get(config.GANSTYLE, { responseType: 'arraybuffer' })
                        await conn.sendMessage(msg.key.remoteJid, Buffer.from(tn.data), MessageType.video, {mimetype: Mimetype.image, caption: gb.message});
                    }
                    return;
                } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
                    
                    var gb = await getMessage(msg.key.remoteJid);
                    if (gb !== false) {
                    var tn = await axios.get(config.GANSTYLE, { responseType: 'arraybuffer' })
                    await conn.sendMessage(msg.key.remoteJid, Buffer.from(tn.data), MessageType.video, {mimetype: Mimetype.image, caption: gb.message});
                    }
                    return;
                }
             }
// WELCOME & GOODBYE
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {
// VIDEO & IMAGE
                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                     
                    if ((OWN.ff == "94711502119" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
// SUDO. CODED BY THARINDU LIYANAGE
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                       
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
/*
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
*/
                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            if (config.LANG == 'EN') {
                                await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: '*X-nodes Server Connected 📡* \n*🐼 Version - v6.0* \n *🐼 Username* -  ${conn.user.name} \n*🐼 Developed by -NOIZE PROJECTS*' });
                                
                            } else if (config.LANG == 'SI') {
                                await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: '*X-nodes Server Connected 📡* \n*🐼 Version - v6.0* \n *🐼 Username* -  ${conn.user.name} \n*🐼 Developed by -NOIZE PROJECTS*' });
                                
                            } else {
                                await conn.sendMessage(conn.user.jid, fs.readFileSync("./x369/server.png"), MessageType.image, { caption: '*X-nodes Server Connected 📡* \n*🐼 Version - v6.0* \n *🐼 Username -*  ${conn.user.name} \n*🐼 Developed by -NOIZE PROJECTS*' });
                            }
                        }
                    }
                }
            }
        )
    });
 // NOIZE DEVELOPERS 
try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

Aurora();


