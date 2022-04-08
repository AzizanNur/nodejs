
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs');

app.use(expressLayouts);

//build in middleware
app.use(express.static('public')); //ini untuk membuka semua asset untuk menampilkan image, css, js dan lain-lain

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
  const send = {
    layout: 'layouts/main-layouts',
    title: 'contact',
   }
  res.render('contact', send);
})

app.get('/produk/:id/?category/:idCat', (req, res) => {
    res.send(`ini adalah idproduk ${req.params.id}<br>ini adalah idcategori ${req.params.idCat}`)
})

app.use((req, res) => {
  res.status = 404;
  res.send('<h1>404</h1>'); 
  // res.redirect('/')     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})