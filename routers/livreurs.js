const router = require('express').Router(); 
const lodash = require('lodash');
const {Livreur,livreur_validation} = require('../models/livreur');
router.get('',async (req,res)=>{

    res.send(await Livreur.find());
    });
    
    
    router.get('/:id',async(req,res)=> { 
    
    let livreur= await Livreur.findById(req.params.id);
    if (!livreur)
        res.status(404).send('livreur with this id not found ');
    
    res.send(livreur);
    
    });
    
    router.post('/',async (req,res)=>{
    

    let validation = livreur_validation(req.body)
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    let livreur= new Livreur(lodash.pick(req.body,['Nom','Prenom','Email','Password','Addresse','Numero_telephone','Vehicule','Matricule']));
    try{
        livreur= await livreur.save();
        res.status(201).send(livreur);
    }catch(err){
    return res.status(400).send(err);
    }     
    });
    
    router.put('/:id',async(req,res)=>{
        
        let livreur= await Livreur.findById(req.params.id);
        if (!livreur)
            res.status(404).send('livreur with this id not found ');
    
        livreur= lodash.merge(livreur,req.body);
        livreur= await livreur.save();
        res.send(livreur);
    });
    router.delete('/:id',async(req,res)=>{
    let livreur= await Livreur.findByIdAndDelete(req.params.id);
    res.send(livreur);
    });
    module.exports = router;