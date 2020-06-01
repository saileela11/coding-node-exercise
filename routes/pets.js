const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet Name'),
    colour: Joi.string().required().description('Pet Colour'),
    age: Joi.number().integer().required().description('Pet Age'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);
router.get('/', async (req, res, next) => {
    try {
        Pets.find().exec().then(data=>{
        res.status(200).json(data);
        });
    } catch (e) {
        res.send('something went wrong!!!');
        next(e);
    }
});
router.get('/pet/:name', async (req, res, next) => {
    try {
        Pets.find({name:req.param.name}).exec().then(data=>{
            if(!data){
                res.status(200).json(data);
            }else{
            res.status(404).end();
            }
            });
    }catch (e) {
        res.send('something went wrong!!!');
        next(e);
    }
});

router.delete('/pet/:Id', async (req, res, next) => {
    try {

            Pet.findByIdAndRemove(rea.body.Id).exec().then(doc=>
                {
                    if(!doc){
                        return 
                        res.status(404).end();
                        return new status(204).end();
                    }

                    });
               
                 } catch (e) {
        res.send('something went wrong!!!');
        next(e);
    }
});
module.exports = router;