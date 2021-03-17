const mongoose = require('mongoose');
const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const passwordComplexity = require("joi-password-complexity");
const { number } = require('joi');
const MedecinSchema = new mongoose.Schema({
    Nom : {type:String,required:true,validate: {validator:function(v){
   return  v.length <10},message:'name must contains 10 caracteres as max '}},
    Prenom : {type:String,required:true},
    Password : {type:String,required:true},
    Addresse : {type:String,required:true},
    Numero_Telephone: {type:Number,required:true},
  })
  let medecin_validation_schema= Joi.object({
  Nom:Joi.string().min(3).max(10).required(),
  Prenom:Joi.string().min(3).max(10).required(),
  Addresse:Joi.string().min(3).max(10).required(),
  Password:new passwordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  }),
Numero_Telephone:myCustomJoi.string().phoneNumber({ defaultCountry: 'BE', format: 'international' })});
 function medecin_validation(body) {
return medecin_validation_schema.validate(body); 
 }
const Medecin = mongoose.model('Medecin',MedecinSchema);
module.exports.Medecin=Medecin; 
module.exports.medecin_validation=medecin_validation; 
