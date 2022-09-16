import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import Cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 8001;

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
//DB Config
export const Connection = async() =>{
  const connectionParams = {
  useNewUrlParser:true,
  useUnifiedTopology:true,
};

// try{
//     await mongoose.connect("mongodb+srv://admin:admin@cluster0.me1r6ah.mongodb.net/tinderdb?retryWrites=true&w=majority",connectionParams);
//     console.log("Connected to the database.");
// }
// catch(error){
//   console.log(error);
//   console.log("Could not connect to the database.");
// }
 };

const connectionUrl ="mongodb+srv://admin:admin@cluster0.me1r6ah.mongodb.net/tinderdb?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Db connected!");
});


//Middlewares
app.use(express.json());
app.use(Cors());

//API Endpoints
//root url with a callback function
app.get("/", (req,res) =>{
        res.status(200).send("Hello World");
});

//endpoint that will add data to the database
//post is a uploading method for API's
//post is to push the information into our database and get is to get the information
app.post("/tinder/cards",(req,res) => {
      const dbCard = req.body;
      Cards.create(dbCard, (err,data) =>{
        if(err){
          res.status(500).send(err);
        }
        else{
              res.status(201).send(data);
        }
      });
});

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single thing from the collection DB that we just created
//with this we will be retriving all the collection from the database that we saved
app.get("/tinder/cards",(req,res) => {
      Cards.find((err,data) =>{
        if(err){
          res.status(500).send(err);
        }
        else{
              res.status(200).send(data);
        }
      });
});
