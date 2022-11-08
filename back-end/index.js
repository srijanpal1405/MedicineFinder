const express = require('express');
require('./config');
const Vendor = require('./vendor');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/submit", async(req,resp)=>{
    return console.log(req.body);
});

// app.get("/search/:key", async(req,resp)=>{
//     console.log(req.params.key)
//     let data = await Vendor.find(
//         {
//             "$or":[
//                 {"med_Name": {$regex:req.params.key}},
//                 {"gen_Name": {$regex:req.params.key}}
//             ],
//             "$and":[
//                 {"pin": "700014"}
//             ]
//         }
//     )
//     resp.send(data);
// });

app.listen(5000);