const router = require('express').Router(); 
const lodash = require('lodash');
const {Patient,patient_validation} = require('../models/patient');


router.get('',async (req,res)=>{
let patient = await Patient.find();
res.send(patient);
});

router.get('/:id',(req,res)=>{


let patient = Patient.findById(req.params.id);
if(!patient)
    return res.status(404).send('patient with this id not found ');
res.send(patient);


})
router.post('/',async(req,res)=>{

let validation =patient_validation(req.body);
if(validation.error)
     return res.status(400).send(validation.error.details[0].message)
let patient = new Patient(lodash.pick(req.body,['Nom',
    'Prenom','Cin','Addresse',
    'Age',
    'Password','umero_Telephone']))
patient = await patient.save(patient)

res.send(patient);

}
);
router.put('/:id',async(req,res)=>{
    
    let patient = await Patient.findById(req.params.id);
    if (!patient)
        res.status(404).send('patient with this id not found ');

    patient = lodash.merge(patient,req.body);
    patient = await patient.save();
    res.send(patient);
});
router.delete('/:id',async(req,res)=>{
let patient = await Patient.findByIdAndDelete(req.params.id);
res.send(patient);
});

module.exports =router;


