const router = require('express').Router(); 
const lodash = require('lodash');
const {Pharmacie,pharmacie_validation} = require('../models/pharmacie ');
router.get('',async (req,res)=>{

    res.send(await Pharmacie.find());
    });
    
    
    router.get('/:id',async(req,res)=> { 
    
    let pharmacie= await Pharmacie.findById(req.params.id);
    if (!pharmacie)
        res.status(404).send('pharmacie with this id not found ');
    
    res.send(pharmacie);
    
    });
    
    router.post('/',async (req,res)=>{
    

    let validation = pharmacie_validation(req.body)
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    let pharmacie= new Pharmacie(lodash.pick(req.body,['Nom','Email','Password','Addresse','Numero_telephone']));
    try{
        pharmacie= await pharmacie.save();
        res.status(201).send(pharmacie);
    }catch(err){
    return res.status(400).send(err);
    }     
    });
    
    router.put('/:id',async(req,res)=>{
        
        let pharmacie= await Pharmacie.findById(req.params.id);
        if (!pharmacie)
            res.status(404).send('pharmacie with this id not found ');
    
        pharmacie= lodash.merge(pharmacie,req.body);
        pharmacie= await pharmacie.save();
        res.send(pharmacie);
    });
    router.delete('/:id',async(req,res)=>{
    let pharmacie= await Pharmacie.findByIdAndDelete(req.params.id);
    res.send(pharmacie);
    });
    module.exports = router;
    
