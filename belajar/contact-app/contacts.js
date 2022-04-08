//ini adalah file yang menangani khusus module yang dibutuhkan untuk contact, dan simpan kontaknya

const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//membuat folder jika tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

//membuat file jika blm ada
let filePath = `${dirPath}/contacts.json`;
if(!fs.existsSync(filePath)){
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// const pertanyaan2 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question('Berapa no telpon Anda? ', (noHp) => {
//       resolve(noHp);
//     });
//   });
// }

// const pertanyaan3 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question('Masukkan email? ', (noHp) => {
//       resolve(noHp);
//     });
//   });
// }

//list pertanyaan yg bisa dibuat list
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (jawaban) => {
            resolve(jawaban);
        });
    });
}
  
const simpanContacts = (nama, noHp, email) => {
    const responNama = {nama, noHp, email};
    const file = fs.readFileSync(filePath, 'utf-8');
    const contact = JSON.parse(file);

    contact.push(responNama);

    fs.writeFile(filePath, JSON.stringify(contact), (e) => {
        if(e === null){
        fs.readFile(filePath, (err, data) => {
        if (err) throw err;
            console.log(data.toString());
        });
        }else{
        console.log(e);
        }
    });
    rl.close();
}

module.exports = {tulisPertanyaan, simpanContacts}