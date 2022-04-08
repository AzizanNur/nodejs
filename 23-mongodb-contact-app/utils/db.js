const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndes: true, //ini ditambahkan agar ditambahkan index disetiap buatnya, terkadang tidak support
});

// //mencoba menambahkan 1 data
// const contact1 = new Contact({
//     nama: 'Azhar',
//     nohp: '08888555',
//     email: 'azhar@gmail.com'
// })

// //simpan ke collection
// contact1.save().then((result) => console.log(result));