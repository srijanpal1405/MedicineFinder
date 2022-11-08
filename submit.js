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
    // console.log(data)
    var fs = require('fs');
    fs.writeFile("public/test.json", JSON.stringify(data), function(err) {
    if (err) {
        console.log(err);
    }
    });

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

function show(data) {
    let tab = 
        `<tr>
          <th>Name</th>
          <th>Office</th>
          <th>Position</th>
          <th>Salary</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.list) {
        tab += `<tr> 
    <td>${r.med_ID} </td>
    <td>${r.med_Name}</td>
    <td>${r.gen_Name}</td> 
    <td>${r.shop_name}</td>          
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("medicines").innerHTML = tab;
}

console.log("Listening on PORT 3000");