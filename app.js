const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactMe', {useNewUrlParser: true});


app.use('/static', express.static('static')) 
app.use(express.urlencoded())
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
    
  });
  const Contact= mongoose.model('Contact', contactSchema);



app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 
 

app.get('/home', (req, res)=>{
    
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{
    
    res.status(200).render('contact.pug');
})
app.post('/contact',(req,res) =>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to the database")
}).catch(()=>{
    res.status(400).send("not valid")
});

})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});