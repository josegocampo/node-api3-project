const express = require('express');
const userDb = require('./userDB');
const postDb = require('../posts/postDb')
const router = express.Router();

router.post('/', async (req, res) => {
  // do your magic!
  try{
    console.log('hits')
    res.status(201).json( await userDb.insert({name: req.body.name}))
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error while adding the user"})
  }
});


router.post('/:id/posts', validateUserId(), (req, res, next) => {
    try{
      res.status(201).json( await userDb.insert({
        name: req.body.name
      }))
    }
    catch(err){
      next(err)
    }
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
   try{ 
      const userId = await userDb.getById(req.params.id) 
      if (!userId){
        res.status(400).json({
          message: "invalid user id" 
        })
      }
      else{
        req.user = userId
        next()
      }
   }
   catch(err){
     next(err)
   }
}

async function validateUser(req, res, next) {
    try{
      if (!req.body){
        res.status(400).json({
          message: "missing user data"
        })
      } 
      else{
        if (!req.body.name){  
          res.status(400).json({message: "missing required name field"
        }) 
        }
      }
    }
    catch(err){
      next(err)
    }
}

function validatePost(req, res, next) {
  try{
    if (!req.body){
      res.status(400).json({
        message: "missing user data" 
      })
    }
    else if (!req.body.text){ 
      res.status(400).json({
        message: "missing required name field"
      })
    }
  }
  catch(err){
    next(err)
  }
}

module.exports = router;
