import clientPromise, { dbName } from "./mongodb";
import { ObjectId } from "mongodb";

export type StoredUser = {
  _id?: ObjectId; // MongoDB will generate this
  name: string;
  email: string;
  password: string;
  role: "client" | "lawyer";
  createdAt: Date;
};

// Add a new user
export async function addUser(user: StoredUser) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db.collection("users").insertOne(user);
  return { ...user, _id: result.insertedId };
}

// Find user by email
export async function findUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection<StoredUser>("users").findOne({ email: email.toLowerCase() });
}

// Validate user (for login)
// lib/db.ts
export async function validateUser(email: string, password: string) {
  const client = await clientPromise;
  const db = client.db("lawmate"); // or use dbName if exported
  const user = await db.collection<StoredUser>("users").findOne({ email: email.toLowerCase() });

  if (!user) return null;
  if (user.password !== password) return null; // TODO: use bcrypt in production
  return user;
}


// List all users
export async function listUsers() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection<StoredUser>("users").find().toArray();
}
