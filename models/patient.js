const mongoose = require('mongoose');
const Joi = require('joi');
const myCustomJoi = require('joi-phone-number');
const passwordComplexity = require("joi-password-complexity");
const now = Date.now();
const cutoffDate = new Date(now -(1000 * 60 * 60 * 24 * 365 * 18));
const patient_schema = new mongoose.Schema({
Nom:{type:String,required:true},
Prenom:{type:String,required:true},
Cin:{type:Number,required:true},
Addresse:{type:String,required:true},
Age:Date,
Password:{type:String,required:true},
Numero_Telephone:{type:Number,required:true}
});

let patient_validation_schema= Joi.object({
    Nom:Joi.string().min(3).max(10).required(),
    Prenom:Joi.string().min(3).max(10).required(),
    Addresse:Joi.string().min(3).max(10).required(),
    Cin:Joi.number().min(8),
    Age:Joi.date().max(cutoffDate).required(),
    Password:new passwordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      numeric: 1,
      upperCase: 1,
      symbol: 1,
      requirementCount: 4
    })});
  
   function patient_validation(body) {
  return patient_validation_schema.validate(body); 
   }

const Patient = mongoose.model('Patient',patient_schema);
module.exports.Patient=Patient;
module.exports.patient_validation=patient_validation;