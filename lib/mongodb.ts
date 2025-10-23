// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://blxckbit_db_user:Paradox11@cluster0.7keburt.mongodb.net/fantasynames?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;