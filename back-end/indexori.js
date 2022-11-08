const express = require('express');
require('./config');
const Vendor = require('./vendor');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/find", async(req,resp)=>{
    let data = await Vendor.find({});
    resp.send(data);
    console.warn(data);
});

app.get("/search/:key", async(req,resp)=>{
    console.log(req.params.key)
    let data = await Vendor.find(
        {
            "$or":[
                {"med_Name": {$regex:req.params.key}},
                {"gen_Name": {$regex:req.params.key}}
            ],
            "$and":[
                {"pin": "700014"}
            ]
        }
    )
    resp.send(data);
});

app.listen(5000);