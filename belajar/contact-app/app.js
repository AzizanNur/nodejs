// //ini adalah fungsi mainnya yang mengelola hasil outputnya
const contacts = require('./contacts');

const main = async () => {
  const nama  = await contacts.tulisPertanyaan('siapakah nama anda? ');
  const noHp  = await contacts.tulisPertanyaan('masukkan no hp mu? ');
  const email = await contacts.tulisPertanyaan('emailkamu apa ya? ');
  contacts.simpanContacts(nama, noHp, email);
}

main();