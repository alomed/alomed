const { string, number } = require('joi');
const mongoose =require('mongoose');
const Joi=require('joi') ;
const validator = require('email-validator');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const passwordComplexity = require("joi-password-complexity");
 
const pharmacieSchema = new mongoose.Schema({
    
    Nom:{type:String,required:true },
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
    }

});

let pharmacie_validation_schema= Joi.object({
    Nom:Joi.string().min(3).max(30).required(),
    Email:Joi.array().items(Joi.string().email().max(256).required()).single().required(),
    Addresse:Joi.string().min(3).max(30).required(),
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
   function pharmacie_validation(body) {
  return pharmacie_validation_schema.validate(body); 
   }

   const Pharmacie =mongoose.model('Pharmacie',pharmacieSchema);
  module.exports.Pharmacie= Pharmacie; 
  module.exports.pharmacie_validation=pharmacie_validation; 
  





