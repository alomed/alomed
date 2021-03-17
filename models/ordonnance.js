const { date } = require('joi');
const mongoose = require('mongoose');

const ordonnanceschema =new mongoose.Schema( {
 date: {type:Date,default:Date.now()},
 medicaments:[String],
 medecin:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Medecin'},Nom:String},
 patient:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Patient'},Nom:String},
 pharmacie:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Pharmacie'},Nom:String,Addresse:String}
});
const Ordonnance = mongoose.model('Ordonnance',ordonnanceschema);
module.exports= Ordonnance;
