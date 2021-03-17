const { date } = require('joi');
const mongoose = require('mongoose');

const commandeeschema = new mongoose.Schema({
 date: {type:Date,default:Date.now()},
 medicaments:[String],
 livreur:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Livreur'},Nom:String,Vehicule:String},
 patient:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Patient'},Nom:String},
 pharmacie:{id:{type:mongoose.Schema.Types.ObjectId,ref:'Pharmacie'},Nom:String,Addresse:String},
 Addresse_de_livraison:{type:String}
});
const Commande = mongoose.model('Commande',commandeeschema);
module.exports= Commande;
