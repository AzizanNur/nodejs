const { dir } = require('console');
const fs = require('fs');

//menulis file
//sycn
// try{
//     fs.writeFileSync('test.txt', 'halo azhar zeline kalian hebat');
// }catch(e){
//     console.log(e);
// }
//asy
// fs.writeFile('test.txt', 'halo ini asyc', (e) => {
//     console.log(e);
// });

//membaca isi file (sync)
// const data = fs.readFileSync('test.txt');
// console.log(data.toString(), 'ini sync');

//membaca isi file (asyc)
// fs.readFile('test.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString(), `ini asyc`);
//   });

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
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
  fs.writeFileSync(filePath, '[]');
}

rl.question('Siapa nama Anda? ', (nama) => {
  rl.question('Berapa no telpon Anda? ', (noHp) => {
      const responNama = {nama, noHp};
      const file = fs.readFileSync('test.txt', 'utf-8');
      const contact = JSON.parse(file);
      
      contact.push(responNama);
      
      fs.writeFile('test.txt', JSON.stringify(contact), (e) => {
        if(e === null){
          fs.readFile('test.txt', (err, data) => {
          if (err) throw err;
            console.log(data.toString());
          });
        }else{
          console.log(e);
        }
      });
    rl.close();
  });
});