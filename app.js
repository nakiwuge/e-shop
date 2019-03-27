const express = require('express');
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')
app.use(bodyParser.json())
Category = require('./models/category')
Item = require('./models/item')
//connect to db
mongoose.connect('mongodb://localhost/eshop')
const db = mongoose.connection

app.get('/', (req,res)=>{
res.send('Home page')
})

app.get('/api/categories', (req,res)=>{
    Category.getCategories((err, categories)=>{
        if(err){
            throw err;
        }
        res.json(categories)
    })
})

app.get('/api/items', (req,res)=>{
    Item.getItems((err, items)=>{
        if(err){
            throw err;
        }
        res.json(items)
    })
})

app.get('/api/items/:id', (req,res)=>{
    Item.getItemById(req.params.id, (err, item) => {
        if(err){
            throw err;
        }
        res.json(item)
    })
})

app.post('/api/items', (req,res)=>{
    const item = req.body;
    Item.addItem(item,(err, item)=>{
        if(err){
            throw err;
        }
        res.json(item)
    })
})

app.put('/api/items/:id', (req,res)=>{
    const id = req.params.id
    const item = req.body;
    Item.updateItem(id, item, {}, (err, item)=>{
        if(err){
            throw err;
        }
        res.json(item)
    })
})

app.delete('/api/items/:id', (req,res)=>{
    const id = req.params.id
    Item.deleteItem(id, (err, item)=>{
        if(err){
            throw err;
        }
        res.json(item)
    })
})

app.listen(3000, ()=>{
    console.log('started..')
})