import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

let client;
let clientPromise: Promise<MongoClient>;
const dbName = "lawmate";

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} 
else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
export { dbName };

