
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, addContact, cekDuplicat, deleteContactIs, updateContacts} = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');

//npm untuk pesan singkat / flash session ketika data berhasil disimpan
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); //third-party middleware
app.use(express.static('public')); //build-in middleware: ini untuk membuka semua asset untuk menampilkan image, css, js dan lain-lain
app.use(express.urlencoded({extended: true}));//build-in midderlware: ini untuk menangkap hasil dari data post yang dikirim dari submit

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

app.get('/about', (req, res) => {
  const send = {
    layout: 'layouts/main-layouts',
    title: 'about',
   }
  res.render('about', send);
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  const send = {
    layout: 'layouts/main-layouts',
    title: 'contact',
    contacts,
    msg: req.flash('msg'), // diambil dari proses tambah data yang telah berhasil
   }
  res.render('contact', send);
})

//halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  const send = {
    layout: 'layouts/main-layouts',
    title: 'Form tambah data contact',    
   }
  res.render('add-contact', send);
})

//proses tambah data contact
// app.post('/contact', [body('email').isEmail(), body('nohp').isMobilePhone('id-ID')], (req, res) => { //ini default jika tidak menggunakan check
app.post('/contact', [
    body('nama').custom((value) => {
      const duplicat = cekDuplicat(value);
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
    addContact(req.body);

    //kirimikan flash
    req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
    res.redirect('/contact');
  }
});

//proses delete contact
app.get('/contact/delete/:nama', (req, res) =>{
  const contact = findContact(req.params.nama);
  //jika contact tidak ada
  if(!contact){
    res.status(404);
    res.send('<h1>404</h1>');
  }else{
    deleteContactIs(req.params.nama);
    req.flash('msg', 'Data Contact Berhasil Dihapus!');
    res.redirect('/contact');
  }
});

//form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  const send = {
    layout: 'layouts/main-layouts',
    title: 'Form ubah data contact', 
    contact   
   }
  res.render('edit-contact', send);
})

//proses ubah data
app.post('/contact/update', [
  body('nama').custom((value, {req}) => {
    const duplicat = cekDuplicat(value);
    console.log(req.body.oldNama);
    if(value !== req.body.oldNama && duplicat){
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
      res.render('edit-contact', {
        title: "form ubah data contact",
        layout: 'layouts/main-layouts',
        errors: errors.array(),
        contact: req.body,
      });
    }else{
      //kalau datanya yg dikirimkan sudah benar semua
      updateContacts(req.body);

      // kirimikan flash
      req.flash('msg', 'Data Contact Berhasil Diubah!');
      res.redirect('/contact');
    }
});


//halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  const send = {
    layout: 'layouts/main-layouts',
    title: 'contact',
    contact
   }
  res.render('detail', send);
})

app.use((req, res) => {
  res.status = 404;
  res.send('<h1>404</h1>'); 
  // res.redirect('/')     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})