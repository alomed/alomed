const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alomed1:alomed@cluster0.jzvmu.mongodb.net/alomed?retryWrites=true&w=majority'  
,{useNewUrlParser: true , useUnifiedTopology:true})
.then(()=>console.log('mongodb is up '))
.catch(err=>console.log('mongodb is down because  :',err))