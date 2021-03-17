const mongoose = require('mongoose');
const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const passwordComplexity = require("joi-password-complexity");
const livreurSchema = new mongoose.Schema({
    
    Nom:{type:String,required:true },
    Prenom :{type:String,required:true},
    Addresse:{
        type:String,required:true
    },
    Numero_telephone:{
        type :Number,required:true

    },
    Email :{
        type :String,required:true
    },
    Password :{
        type :String,required:true
    },
    Vehicule :{type:String,required:true},
    Matricule: {type:String,required:true},

});
let livreur_validation_schema= Joi.object({
    Nom:Joi.string().min(3).max(30).required(),
    Prenom:Joi.string().required(),
    Email:Joi.array().items(Joi.string().email().max(256).required()).single().required(),
    Addresse:Joi.string().min(3).max(30).required(),
    Vehicule:Joi.string().required(),
    Matricule:Joi.string().required(),
    Password:new passwordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4
    }),
  Numero_telephone:myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'international' })});
   function livreur_validation(body) {
  return livreur_validation_schema.validate(body); 
   }

   const Livreur=mongoose.model('Livreur',livreurSchema);
  module.exports.Livreur=Livreur; 
  module.exports.livreur_validation=livreur_validation; 
  



