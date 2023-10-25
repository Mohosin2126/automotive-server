const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000 ;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER_AUTO_MOTIVE_ASSIGNMENT101023}:${process.env.DB_USER_PASS_AUTO_MOTIVE_ASSIGNMENT101023}@cluster0.crat2tn.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    // await client.connect();


    const brandsCollection = client.db("Brand").collection('BrandName');
    const allBrandsCollection = client.db("Brand").collection("BrandsCollection");
    const brandUpdateCollection = client.db("Brand").collection("UpDateCollection");
    const mycartCollection = client.db("Brand").collection("mycart");

    app.get("/brands", async (req, res) => {
      const cursor = brandsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/allBrands", async (req, res) => {
      const cursor = allBrandsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/addProduct", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await brandUpdateCollection.insertOne(newProduct);
      res.send(result);
    });


    // Ping the MongoDB deployment to check the connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.listen(port, () => {
  console.log(`automotive server is running on port ${port}`);
});
