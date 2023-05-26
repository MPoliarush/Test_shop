const express = require('express')
const router = express.Router()
const path = require('path')

const db = require('../data')
const mongodb = require('mongodb')


const ObjectId = mongodb.ObjectId



router.get('/getrest', async (req,res)=>{

    let addrest
    try{
        addrest = await db.getDb().collection('restaurants').find().toArray()
        console.log(addrest)
      }catch(e){
        addrest = 'error'
      }

    res.send(addrest)
})


router.post('/receivedOrder', async (req,res)=>{

  console.log(req.body)
  try{
      const addrest = await db.getDb().collection('clientOrders').insertOne(req.body)
      console.log(addrest)
    }catch(e){
      addrest = 'error'
    }

 
})


router.post('/getUserHistory',async (req,res)=>{
  console.log(req.body.email)
  let  filtered

  try{
    const addres = await db.getDb().collection('clientOrders').find().toArray()
      console.log(addres)
       filtered = addres.filter(item=>item.client.email==req.body.email)
      console.log(filtered)
    }catch(e){
     findClient = 'error'
    }
  res.send(filtered)
})



module.exports = router







