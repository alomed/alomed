const router = require('express').Router();

const Ordonnance = require('../models/ordonnance');
const {Medecin} = require('../models/medecin');
const {Patient} = require('../models/patient');
const {Pharmacie}= require('../models/pharmacie ');
const lodash = require('lodash');

router.get('',async (req,res)=>{

    res.send(await Ordonnance.find());
    });
    
    
    router.get('/:id',async(req,res)=> { 
    
    let ordonnance = await Ordonnance.findById(req.params.id);
    if (!ordonnance)
        res.status(404).send('ordonnance with this id not found ');
    
    res.send(ordonnance);
    
    });
    
    router.post('/',async (req,res)=>{
    
    
    //let validation = medecin_validation(req.body)
    //if(validation.error)
      //  return res.status(400).send(validation.error.details[0].message);

    
    let medecin = await Medecin.findById(req.body.medecin.id);
    
    
    if (!medecin)
        return res.status(404).send('medecin with this id not found ');
   
    
    req.body.medecin.Nom= medecin.Nom;
    let  patient = await Patient.findById(req.body.patient.id);
    if(!patient)
        return res.status(404).send('patient with this id not found ');
    
    req.body.patient.Nom = patient.Nom;
    let  pharmacie = await Pharmacie.findById(req.body.pharmacie.id);
    if(!pharmacie)
        return res.status(404).send('pharmacie with this id not found ');
    req.body.pharmacie.Nom = pharmacie.Nom;
    req.body.pharmacie.Addresse= pharmacie.Addresse;
    let ordonnance = new Ordonnance(lodash.pick(req.body,['medicaments','medecin','patient','pharmacie']));
    try{
    ordonnance = await ordonnance.save();
    res.status(201).send(ordonnance);
    }catch(err){
    return res.status(400).send(err);
    }     
    });
    
    router.put('/:id',async(req,res)=>{
        let ordonnance = await Ordonnance.findById(req.params.id);
        console.log(ordonnance);
        if (!ordonnance)
            res.status(404).send('ordonnance with this id not found ');
        ordonnance = lodash.merge(ordonnance,req.body);
        ordonnance = await ordonnance.save();
        res.send(ordonnance);
    });
    router.delete('/:id',async(req,res)=>{
    let ordonnance = await Ordonnance.findByIdAndDelete(req.params.id);
    res.send(ordonnance);
    });


module.exports=router;