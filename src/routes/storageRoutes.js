'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../auth/middleware/bearer');
const authorize = require('../auth/middleware/acl');
const router = express.Router();

router.param('model', (req, res, next) =>{
  const modelName = req.params.model;
  if(dataModules[modelName]){
    req.model = dataModules[modelName];
    next();
  }else{
    next('Invalid Model');
  }
})

router.use(bearerAuth);
router.get('/:model',  authorize('read'), handleGetAll);
router.get('/:model/:id', authorize('read'), handleGetOne);
router.post('/:model',  authorize('create'), handleCreate);
router.put('/:model/:id',  authorize('update'), handleUpdate);
router.delete('/:model/:id',  authorize('delete'), handleDelete);

async function handleGetAll(req, res) {
  try{
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  }catch(e){
    console.error(e.message);
    return e.message;
  }
}

async function handleGetOne(req, res) {
  try{
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  }catch(e){
    console.error(e.message);
    return e.message;
  }
}

async function handleCreate(req, res) {
  try{
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  }catch(e){
    console.error(e);
    return e.message;
  }
}

async function handleUpdate(req, res) {
  try{
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  }catch(e){
    console.error(e);
    return e.message;
  }
}

async function handleDelete(req, res) {
  try{
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  }catch(e){
    console.error(e.message);
    return e.message;
  }
}


module.exports = router;