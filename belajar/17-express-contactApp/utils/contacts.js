const { json } = require('express');
const fs = require('fs');
const path = require('path');

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

const findContact = (nama => {
  // const cekNama = loadContact()
  // .find(e => e.nama === nama);
  // return (cekNama);
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
})

//menuliskan / menimpa file contacts.js dengan data baru
const saveContacts = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts));
}

//menambahkan data contact baru
const addContact= (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);

}

//cek nama yang duplicat
const cekDuplicat = (nama) => {
  const contacts = loadContact();
  return contacts.find(contact => contact.nama === nama);
};

//hapus contact
const deleteContactIs = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
}

const updateContacts = (contactBaru) => {
  const contacts = loadContact();
  //hilangkan contact lama yg namanya sana dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama; //menghapus properti didalam array
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
}

module.exports = { loadContact, findContact, addContact, cekDuplicat, deleteContactIs, updateContacts }