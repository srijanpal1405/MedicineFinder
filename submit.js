var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const {MongoClient} = require('mongodb')
const url= 'mongodb+srv://Medfinder:Medfinder@cluster0.gwb0e7y.mongodb.net/Medfinder_medicine';
const databaseName='Medfinder_medicine'
const client= new MongoClient(url);
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://Medfinder:Medfinder@cluster0.gwb0e7y.mongodb.net/Medfinder_medicine',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))




app.post("/search",(req,res)=>{
    var name=req.body.search;
    var pin=req.body.pin;

    var data={
        "name":name,
        "pin":pin
    }
    async function getData()
{
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('medicine_lists');
    let data = await collection.find({"med_Name":name,"pin":pin}).toArray();
    console.log(data)

}
getData();

    console.log(data);
    return res.redirect("signup_success.html")
})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);



console.log("Listening on PORT 3000");