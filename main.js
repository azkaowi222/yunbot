const teleBot = require("node-telegram-bot-api");
const token = "7173486340:AAGn6PFazinA-zzZyHcY5gDzotPAHBTRIeU";
const options = {
    polling: true
};
const yunbot = new teleBot(token, options);
const prefix = "/";
const gempa = new RegExp(`^${prefix}gempa$`);
const start = new RegExp(`^${prefix}start$`);


yunbot.onText(gempa, async(user) => {
    const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const {Infogempa: {gempa : {
        Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi, Shakemap
    }}} = await response.json();
    const BmkgImage = `https://data.bmkg.go.id/DataMKG/TEWS/${Shakemap}`;
    const resultText = `
Waktu: ${Tanggal}, ${Jam}
Magnitude: ${Magnitude} SR
Kedalaman: ${Kedalaman}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
    `;
    yunbot.sendPhoto(user.from.id, BmkgImage, {
        caption: resultText
    });
});

yunbot.onText(start, (user) => {
    yunbot.sendMessage(user.from.id,
        `
Welcome to yunbot, Kamu bisa cek gempa terkini dengan command berikut:
/gempa
        `
    );
});