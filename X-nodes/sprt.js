const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');

Asena.addCommand({pattern: 'project', fromMe: false,dontAddCommandList: true}, (async (message, match) => {

    var r_text = new Array ();    
r_text[0] = "*GARFIELD v4.0 🐼* \n\n *GARFIELD BOT FROM NOIZE* \n *☁️ Coded by Tharindu Liyanage* \n\n *Special Thanks to 💙* \n *📡 baileys* \n *📡 YusuFunta* \n *📡 Afna Palikkal* \n *📡 Lasindu nethsara* \n *📡 Maleesha nethsara* \n *📡 Hasindu dinushan* \n\n  *Powered by 🌐  Garfieldllc - npm*";
r_text[1] = "*GARFIELD v4.0 🐼* \n\n *GARFIELD BOT FROM NOIZE* \n *☁️ Coded by Tharindu Liyanage* \n\n *Special Thanks to 💙* \n *📡 baileys* \n *📡 YusuFunta* \n *📡 Afna Palikkal* \n *📡 Lasindu nethsara* \n *📡 Maleesha nethsara* \n *📡 Hasindu dinushan* \n\n  *Powered by 🌐  Garfieldllc - npm*";
var i = Math.floor(2*Math.random())

await message.sendMessage(r_text[i]);

}));
