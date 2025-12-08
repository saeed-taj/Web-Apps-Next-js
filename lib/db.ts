export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "client" | "lawyer";
  createdAt: Date;
};

// Simple in-memory store to keep API routes in sync during runtime.
// In production, replace this with a real database model.
const users: StoredUser[] = [];

export function addUser(user: StoredUser) {
  users.push(user);
}

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function validateUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null; // Replace with password hash compare
  return user;
}

export function listUsers() {
  return users;
}

