import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
 import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const client = new MongoClient(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.tp9jxuf.mongodb.net/`);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const ConnectedClient = await connectToMongoDB();
const detabase = ConnectedClient.db('Nadim-Detabase-Server');
const Users = detabase.collection('users')


app.get('/Users', async(req,res)=>{
  const cursor = Users.find({});
  const user = await cursor.toArray();
  res.send(user)

})


app.get( '/' , (req,res)=>{
  res.send('This is Home From Express API')
})



app.listen(PORT,()=>{
  console.log(`This is running on port ${PORT}`)
})