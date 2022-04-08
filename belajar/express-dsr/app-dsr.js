
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
})

app.get('/about', (req, res) => {
//   res.send('Ini adalah about')
    res.sendFile('./about.html', {root: __dirname});
})

app.get('/contact', (req, res) => {
//   res.send('Ini adalah contact')
    res.sendFile('./contact.html', {root: __dirname});
})

app.get('/produk/:id/?category/:idCat', (req, res) => {
    res.send(`ini adalah idproduk ${req.params.id}`)
    // res.sendFile('./contact.html', {root: __dirname});
})

app.use((req, res) => {
  res.status = 404;
  res.send('<h1>404</h1>'); 
  // res.redirect('/')     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const http = require('http');
// const fs = require('fs');

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data)=>{
//         if(err){
//             res.writeHead(404); 
//             res.write('Error: file not found');
//         }else{
//             res.write(data); 
//         }
//         res.end();
//     });
// }

// http
//     .createServer((req, res) => {
//         const url = req.url;
        
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         }); 

//         switch(url){
//             case '/about': 
//             renderHTML('./about.html', res); 
//             break;

//             case '/contact': 
//             renderHTML('./contact.html', res); 
//             break;

//             default: 
//             renderHTML('./index.html', res); 
//             break;
//         }
        
//     })
//     .listen(3000, () => {
//         console.log('server is running');
//     });


