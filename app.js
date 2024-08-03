const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo =require('./db');
const ObjectId = dbo.ObjectID;

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({});
    let books = await cursor.toArray();
    let message = '';
    let edit_id , edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_book = await collection.findOne({_id:new ObjectId(edit_id)});

    }

    if(req.query.delete_id){
        await collection.deleteOne({_id:new ObjectId(req.query.delete_id)});
        return res.redirect('/?status=3')
    }


    switch(req.query.status){
        case '1':
            message='Insert Success';
            break;

        case '2':
            message="Update Success";
            break;

        case '3':
            message="Delete Success";
            break;
        default:
            break;
    }
    res.render('main',{message,books,edit_id,edit_book})
})

app.post('/store_book',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = { title:req.body.Title ,author:req.body.Author };
    await collection.insertOne(book); 
    return res.redirect('/?status=1')

})

app.post('/update_book/:edit_id',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = { title:req.body.Title ,author:req.body.Author };
    let edit_id = req.params.edit_id;


    await collection.updateOne({_id:new ObjectId(edit_id)},{$set:book}); 
    return res.redirect('/?status=2')

})


app.listen(8000,()=>{console.log('Listening Port:8000');})