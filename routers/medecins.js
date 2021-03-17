const router = require('express').Router(); 
const lodash = require('lodash');
const {Medecin,medecin_validation} = require('../models/medecin');

router.get('',async (req,res)=>{

res.send(await Medecin.find());
});


router.get('/:id',async(req,res)=> { 

let medecin = await Medecin.findById(req.params.id);
if (!medecin)
    res.status(404).send('medecin with this id not found ');

res.send(medecin);

});

router.post('/',async (req,res)=>{


let validation = medecin_validation(req.body)
if(validation.error)
    return res.status(400).send(validation.error.details[0].message);
let medecin = new Medecin(lodash.pick(req.body,['Nom','Prenom','Password','Addresse','Numero_Telephone']));
try{
    medecin = await medecin.save();
    res.status(201).send(medecin);
}catch(err){
return res.status(400).send(err);
}     
});

router.put('/:id',async(req,res)=>{
    
    let medecin = await Medecin.findById(req.params.id);
    if (!medecin)
        res.status(404).send('medecin with this id not found ');

    medecin = lodash.merge(medecin,req.body);
    medecin = await medecin.save();
    res.send(medecin);
});
router.delete('/:id',async(req,res)=>{
let medecin = await Medecin.findByIdAndDelete(req.params.id);
res.send(medecin);
});
module.exports = router;
