const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

//menambahkan setting ke monggodb dengan mongoonose
require('./utils/db');
const {Contact} = require('./model/contact');

//npm untuk pesan singkat / flash session ketika data berhasil disimpan
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

//setup method override
app.use(methodOverride('_method'));

//setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); //third-party middleware
app.use(express.static('public')); //build-in middleware: ini untuk membuka semua asset untuk menampilkan image, css, js dan lain-lain
app.use(express.urlencoded({extended: true}));//build-in midderlware: ini untuk menangkap hasil dari data post yang dikirim dari submit
//end setup ejs

//konfigurasi flash
app.unsubscribe(cookieParser('secret'));
app.use(
  session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//end konfigurasi flash

//halaman home
app.get('/', (req, res) => {
    const send = {
    layout: 'layouts/main-layouts',
    nama: 'Azizan - Azhar {ini dari app}',
    title: 'index node',
    mhs:[
      {
        nama: 'azhar',
        email:'azhar@gmail.com'
      },
      {
        nama: 'zeline',
        email:'zeline@gmail.com'
      },
    ]
  }
  res.render('index', send); //nama dari file yang ada di folder views dan folder views ini aturan baku harus ada
})

//halaman About
app.get('/about', (req, res) => {
    const send = {
        layout: 'layouts/main-layouts',
        title: 'about',
        }
    res.render('about', send);
})

app.listen(port, () => {
    console.log(`mongo contact app | listening at http://localhost:${port}`);
});

//halaman Contact
//karena data yang dibutukan di mongodb bentuknya promise maka kita butuh mengubahnya dan memerlukan bentuk asyc await
app.get('/contact', async (req, res) => {

  // Contact.find().then((contact) => {
  //   res.send(contact);
  // });
    const contacts = await Contact.find();
    const send = {
      layout: 'layouts/main-layouts',
      title: 'contact',
      contacts,
      msg: req.flash('msg'), // diambil dari proses tambah data yang telah berhasil
     }
    res.render('contact', send);
})

//proses delete contact this native code
// app.get('/contact/delete/:nama', async (req, res) =>{
//   const contact = await Contact.findOne({nama: req.params.nama});
//   //jika contact tidak ada
//   if(!contact){
//     res.status(404);
//     res.send('<h1>404</h1>');
//   }else{
//     Contact.deleteOne({_id: contact._id}, (e, r) => {
//       if(r){
//         req.flash('msg', 'Data Contact Berhasil Dihapus!');
//         res.redirect('/contact');
//       }
//     });
    
//   }
// });

//this model method ovveride
app.delete('/contact', (req, res) => {
    Contact.deleteOne({nama: req.body.nama}, (e, r) => {
    if(r){
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        res.redirect('/contact');
      }
    });
});

//form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
  const send = {
    layout: 'layouts/main-layouts',
    title: 'Form ubah data contact', 
    contact   
   }
  res.render('edit-contact', send);
})

//form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
  const send = {
    layout: 'layouts/main-layouts',
    title: 'Form ubah data contact', 
    contact   
   }
  res.render('edit-contact', send);
})

//proses ubah data is native
// app.post('/contact/update', [
//   body('nama').custom(async (value, {req}) => {
//     const duplicat = await Contact.findOne({nama: req.body.nama});//cekDuplicat(value);
//     if(value.toLowerCase() !== req.body.oldNama.toLowerCase() && duplicat){
//       throw new Error('Nama contact sudah digunakan');
//     }
//     return true;
//   }),
//   check('email', 'Email tidak valid!').isEmail(), 
//   check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
// ], (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//       // return res.status(400).json({ errors: errors.array() });
//       res.render('edit-contact', {
//         title: "form ubah data contact",
//         layout: 'layouts/main-layouts',
//         errors: errors.array(),
//         contact: req.body,
//       });
//     }else{
//       //kalau datanya yg dikirimkan sudah benar semua
//       // updateContacts(req.body);

//       // kirimikan flash
//       req.flash('msg', 'Data Contact Berhasil Diubah!');
//       res.redirect('/contact');
//     }
// });

// proses ubah data method
app.put(
  '/contact', 
  [
    body('nama').custom(async (value, {req}) => {
      const duplicat = await Contact.findOne({nama: value});//cekDuplicat(value);
      if(value.toLowerCase() !== req.body.oldNama.toLowerCase() && duplicat){
        throw new Error('Nama contact sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), 
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render('edit-contact', {
        title: "form ubah data contact",
        layout: 'layouts/main-layouts',
        errors: errors.array(),
        contact: req.body,
      });
    }else{
      //kalau datanya yg dikirimkan sudah benar semua
      Contact.updateOne(
        {_id: req.body._id}, 
        {
          $set:{
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,            
          }
        }
      ).then((result) => {
        // kirimikan flash
        req.flash('msg', 'Data Contact Berhasil Diubah!');
        res.redirect('/contact');
      });
      
    }
});

//halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  const send = {
    layout: 'layouts/main-layouts',
    title: 'Form tambah data contact',    
   }
  res.render('add-contact', send);
})

//proses tambah data contact
app.post('/contact', [
  body('nama').custom(async (value) => {
    const duplicat = await Contact.findOne({nama: value});//cekDuplicat(value);
    if(duplicat){
      throw new Error('Nama contact sudah digunakan');
    }
    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(), 
  check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
  // return res.status(400).json({ errors: errors.array() });
  res.render('add-contact', {
    title: "form tambah data contact",
    layout: 'layouts/main-layouts',
    errors: errors.array(),
  });
}else{
  //kalau datanya yg dikirimkan sudah benar semua
  Contact.insertMany(req.body, (error, result) => {
    if(result){
       //kirimikan flash
      req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
      res.redirect('/contact');
    }
  });
  // res.send('data berhasil ditambah');
}
});

//halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama}); 
  const send = {
    layout: 'layouts/main-layouts',
    title: 'contact',
    contact
   }
  res.render('detail', send);
})