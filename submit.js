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

app.post("/sign_up",(req,res)=>{
    var med_ID = req.body.med_ID;
    var med_Name = req.body.med_Name;
    var gen_Name = req.body.gen_Name;
    var shop_ID = req.body.shop_ID;
    var shop_name = req.body.shop_name;
    var address = req.body.address;
    var contact = req.body.contact;
    var pin = req.body.pin;
    var stock = req.body.stock;
    var exp = req.body.exp;
    var price = req.body.price;
    

    var data = {
        "med_ID": med_ID,
        "med_Name" : med_Name,
        "gen_Name": gen_Name,
        "shop_ID" : shop_ID,
        "shop_name": shop_name,
        "address":address,
        "contact":contact,
        "pin": pin,
        "stock": stock,
        "exp": exp,
        "price": price
        
    }

    db.collection('medicine_lists').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('Med_Entry.html')

})


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

app.get("/Med_Entry.html",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Med_Entry.html');
});

app.get("/index.html",(req,res)=>{
    return res.redirect('index.html')
})
// app.get("/loginCheck.html",(req,res)=>{
//     return res.render('loginCheck')
// })

app.use(express.static('/vendor.html'));

console.log("Listening on PORT 3000");