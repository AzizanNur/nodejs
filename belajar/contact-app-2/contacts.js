//ini adalah file yang menangani khusus module yang dibutuhkan untuk contact, dan simpan kontaknya

const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const validator = require('validator');

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

//melihat isi dari file contatcts.json
const loadContact = () => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const contact = JSON.parse(file);
  return contact;
}

const saveToFile = (dataFile) => {
  fs.writeFile(filePath, JSON.stringify(dataFile), (e) => {
    if(e === null){
      fs.readFile(filePath, (err, data) => {
    if (err) throw err;
      console.log(data.toString());
    });
    }else{
      console.log(e);
    }
});
}

const simpanContacts = (nama, noHp, email) => {
    const responNama = {nama, noHp, email};
    // const file = fs.readFileSync(filePath, 'utf-8');
    // const contact = JSON.parse(file);
    const contact = loadContact();
    
    //cek duplicat
    const duplicat = contact.find(e => e.nama === nama);
    if(duplicat){
      console.log('nama inputan sama');
      return false;
    }

    //cek imail
    const cekEmail = validator.isEmail(email);
    if(!cekEmail){
      console.log('format email salah');
      return false;
    }

    //cek nohp
    const cekNoHp = validator.isMobilePhone(noHp, 'id-ID');
    if(!cekNoHp){
      console.log('format nomer hp salah');
      return false;
    }

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
 
}

//menampilkan data
const listContact = () => {
  const contact = loadContact();
  console.log('daftar kontak');
  contact.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.email}`);    
  });
}

//menampilkan detial
const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if(!contact){
    console.log('maaf data tidak ditemukan');
    return false;  
  }
  console.log(contact);
}

//delete contact 
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
  
  if(contacts.length === newContact.length ){
    console.log('maaf data tidak ditemukan');
    return false;  
  }

  saveToFile(newContact);
  
}

module.exports = { simpanContacts, listContact, detailContact, deleteContact }