const router = require('express').Router();
const Commande = require('../models/commande');
const lodash = require('lodash');
const {Livreur} = require('../models/livreur');
const {Patient, patient_validation} = require('../models/patient');
const {Pharmacie}= require('../models/pharmacie ');



router.get('',async(req,res)=>{
 let commande = await Commande.find();
res.send(commande);
})


router.post('/',async(req,res)=>{

let patient = await Patient.findById(req.body.patient.id);
if(!patient)
    res.status(400).send('patient with this id is not found ')
req.body.patient.Nom = patient.Nom;
req.body.Addresse_de_livraison = patient.Addresse;

let livreur = await Livreur.findById(req.body.livreur.id);
if(!livreur)
    res.status(400).send('livreur with this id is not found ')
req.body.livreur.Nom = livreur.Nom;
req.body.livreur.Vehicule = livreur.Vehicule;
let  pharmacie = await Pharmacie.findById(req.body.pharmacie.id);
if(!pharmacie)
    return res.status(404).send('pharmacie with this id not found ');
req.body.pharmacie.Nom = pharmacie.Nom;
req.body.pharmacie.Addresse= pharmacie.Addresse;

let commande = new Commande(lodash.pick(req.body,['date','medicaments','livreur','patient','pharmacie','Addresse_de_livraison']));
try{
    commande = await commande.save();
    res.status(201).send(commande);
    }catch(err){
    return res.status(400).send(err);
    }  

});

router.put('/:id',async(req,res)=>{
    let commande = await Commande.findById(req.params.id);
    if (!commande)
        res.status(404).send('commande with this id not found ');
    commande = lodash.merge(commande,req.body);
    commande = await commande.save();
    res.send(commande);
});
router.delete('/:id',async(req,res)=>{
let commande = await Commande.findByIdAndDelete(req.params.id);
res.send(commande);
});
module.exports = router;