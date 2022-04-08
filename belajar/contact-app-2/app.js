const yargs = require('yargs');
const contact = require('./contacts');
// console.log(yargs.argv);

// yargs.command('add', 'menambahkan contact baru', () => {}, (argv) => {
//     console.log(argv)
// });

//proses menyimpan data ke file json
//node app add --nama="ze" --noHP="08990477586" --email="aziza@ngmail.com"
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string'
        },
        noHP: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'nama lengkap',
            demandOption: false,
            type: 'string'
        },
    },
    handler(argv){
        contact.simpanContacts(argv.nama, argv.noHP, argv.email);        
    }
})
.demandCommand();

//menampilkan semua list kontak
//node app list
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan no HP contact',
    handler(){
        contact.listContact();
    }
});

//menampilkan semua detail sebuah kontak
//node app detail --nama="azizan"
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'detail lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.detailContact(argv.nama);        
    }
});

//menghapus data sebuah kontak
//node app delete --nama="azizan"
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah data berdasarkan nama',
    builder: {
        nama: {
            describe: 'detail lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contact.deleteContact(argv.nama);        
    }
});

yargs.parse();