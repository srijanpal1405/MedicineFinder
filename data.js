const {MongoClient} = require('mongodb')
const url= 'mongodb+srv://Medfinder:Medfinder@cluster0.gwb0e7y.mongodb.net/Medfinder_medicine';
const databaseName='Medfinder_medicine'
const client= new MongoClient(url);

async function getData()
{
    let result = await client.connect();
    db= result.db(databaseName);
    collection = db.collection('medicine_lists');
    let data = await collection.find({"med_Name":"Paracetamol 500","pin":"713101"}).toArray();
    console.log(data)


}

getData();