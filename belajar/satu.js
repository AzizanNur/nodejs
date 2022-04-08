function cetakNama(nama){
    return `Halo, nama saya adalah ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'Azhar Azizan Al-fattaah',
    umur: 6,
    profil(){
        return `halo nama saya ${this.nama}, dan umur saya adalah ${this.umur} tahun`
    }
}

class Orang{
    constructor(){
        console.log('Object Orang Telah Dibuat');
    }
}

module.exports = {cetakNama, PI, mahasiswa, Orang};