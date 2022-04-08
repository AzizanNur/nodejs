const { resolveObjectURL } = require("buffer");
const { MongoClient } = require("mongodb");

//setup database local
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

//setup mongodb
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//proses conect
client.connect((error, client)=>{
    if(error){
        return console.log('connection gagal');        
    }
    // console.log('berhasil');

    //pilih database
    const db = client.db(dbName);

    //===========================================
    //  C R E A T E
    //===========================================
    //menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'nisa',
    //         email: 'nisa@gmail.com'
    //     }, 
    //     (error, result) => {
    //         if(error){
    //             return 'gagal menambahkan data';
    //         }
    //         console.log(result);
    //     }
    // );

    //menambahkan banyak data ke collections mahasiswa
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'kijang',
    //             email: 'kijang@gmail.com'
    //         },
    //         {
    //             nama: 'buaya',
    //             email: 'buaya@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if(error){
    //             return 'gagal menambahkan data';
    //         }
    //         console.log(result);
    //     }
    // );

    //===========================================
    //  A D D
    //===========================================
    //menampilkan semua data yang ada di collection
    // const data = 
    //     db
    //     .collection('mahasiswa')
    //     .find()
    //     .toArray((error, result) => {
    //         console.log(result);
    //     });

    //menampilkan data berdasarkan kriteria yang ada di collection
    // var ObjectId = require('mongodb').ObjectID;
    // const data = 
    //     db
    //     .collection('mahasiswa')
    //     .find({
    //         _id: ObjectId("6235f0bd4acf6a765999feed"), //ini digunakan untuk menampilkan id, jadi harus dimasukkan ke dalam ObjectID dulu
    //         // nama: "azizan" //ini digunakan untuk mengambil satu data
    //     })
    //     .toArray((error, result) => {
    //         console.log(result);
    //     });

    //===========================================
    //  U P D A T E
    //===========================================
    //mengubah data berdasarkan ID dengan menggunakan function callback
    // var ObjectId = require('mongodb').ObjectID;
    // db.collection('mahasiswa').updateOne(
    //     {_id: ObjectId("6235f0bd4acf6a765999feed")},
    //     [
    //         { $set: { email: "ihihihih@gmail.com", comments: [ "$misc1", "$misc2" ] }},
    //         { $unset: [ "misc1", "misc2" ] }
    //     ],
    //     ((error, result) => {
    //         console.log(result);
    //     }),
    // );

    //mengubah data berdasarkan ID dengan menggunakan promise
    // var ObjectId = require('mongodb').ObjectID;
    // const updatePromes = db.collection('mahasiswa').updateOne(
    //     {_id: ObjectId("6235f0bd4acf6a765999feed")},
    //     [
    //         { $set: { email: "sukses@gmail.com"}},
    //         { $unset: [ "misc1", "misc2" ] }
    //     ]
    // );

    // updatePromes.then(result => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });
    //nb kalau mau update banyak bisa pakai updateMany();

    //===========================================
    //  U P D A T E
    //===========================================
    //mode chaining yaitu bentuk promise tapi gak perlu dibuatkan variablenya, jadi langsung digabung
    // var ObjectId = require('mongodb').ObjectID;
    // db.collection('mahasiswa').deleteOne(
    //     {_id: ObjectId("6235f0bd4acf6a765999feed")}         
    // ).then((result) => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // });
    
});