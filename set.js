




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE81cldyMnAzQTVvRUQ2SVJBUTBJNEJBUDlPbHRGNlR2QVV2aldWT1puQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazc5dzVHejg0bkJvSGhHSjRlQk1WclR3a0JDTnhGdFJrc2VOTDBqUTV3az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNT1pBZkVkSUo2bmZRc2pHdzhZaXFWL1ZNYi9vWjhERFJVTGhRajlnMVdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrZ1RZSDFUWXhDMzQvaVZaV0toYWoza3p2WE5qNHlCOHN6N2d4alVtRXpnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNDZmlZT0FiMktBeHBPdU10VENMVVJlazJaaks4eDc5NnJYbWowYkdaRVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9GTm1uRjVVUzgrODBaN0tsbkZIMGxsZHVOOVNNNTVOTGVoUFREakYwaVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0R6N3NPTllPZTRWcVhrZkc2Z0R4TlRuTURobHFHK0ZrNWw2NFNTRGlFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFB6S0lRb3BtOEhMOWQrRVZiM3RadnVUZStCYXBlOUxPQWxzaTJpTzlCZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZpdXlsOEpnZHIwS3FSUkN2RXB0WXQ5dy9LWTYwTlRvOHlpc0lMU0l3SnE5S3JXa2ZQZlZkSURGZ3VHY2VSTk9SRFpOMThrR3BWTXR6TGFaRHNYYmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJsYTdLbXpwSDZSZGpGYW16SXpPYkY2TG9jOTNDMGdoQTZvZkdIWllnVmFFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDEwMzQ0OTE3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNUEyMTI0OUI4REMxODk2QURFN0ZBMTRFQzUyMUEzRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMzQ0MzAxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMDM0NDkxNzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzA2QzI1Rjc3Mjk4RTY4NzA5NTRCRjJBMEZFQjAzMTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDM0NDMwMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRFhSV1RXUEMiLCJtZSI6eyJpZCI6IjI1NDEwMzQ0OTE3Njo1M0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjkzODQ5MDYyMDMxNzk6NTNAbGlkIiwibmFtZSI6IvCfkIoifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ042OS9Pc0RFTm5FME1JR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlHQWRiZlRKc3I5Njd0UUNCeGY4RlhXb0Vld0luN0dvdjJVUUxxYmdxM3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6InkxN1cvcFYyb0xyMmIzNmUrVERwODhqaFFTN292RzN5S05hU0JYQnRJYUNSZktScmZSY1pha096YktKNTkzMGZ3MExyMXRYMTFLUjYyYkdVQ1Q1eUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJSFBOL1ZMYmZBa1h4U3pDa25wVFI0TG50UnI4OVc2MGlXN0JPL2JVdFZRMmY2TjNYRFJmNXl1akN5aGtjV2JGeGx5VkxYajB6R1VDMWlnbDVmT0NoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwMzQ0OTE3Njo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZaGdIVzMweWJLL2V1N1VBZ2NYL0JWMXFCSHNDSit4cUw5bEVDNm00S3Q4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTAzNDQyOTQsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRmVVIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254710772666",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
