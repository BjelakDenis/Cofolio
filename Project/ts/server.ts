const express = require('express');
const bodyParser = require('body-parser');
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { DB } from "../db/db.ts";

interface User {
  email: string;
  password?: string;
  display_name: string;
  photo_url: string;
}

const app = express();
const port = 5173;
const ACCESS_TOKEN_SECRET = "your_secret_key";

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user: User | null = await GetUserByEmailFromDB(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password||"");

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const payload = { user };
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.post("/register", async (req, res) => {
  const { email, password, display_name, photo_url } = req.body;

  const existingUser: User | null = await GetUserByEmailFromDB(email);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const user: User = {
    email,
    password: hashedPassword,
    display_name: display_name,
    photo_url: photo_url,
  };

  await InsertUserToDB(user);

  const payload = { user }; // Optional payload for registration token
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  if (token) {
    res.json({ message: "User registered successfully", token });
  } else {
    res.json({ message: "User registered successfully" });
  }
});

async function InsertUserToDB(user: User):Promise<boolean> {
  const db = await DB.createDBConnection();
  try {
    const stmt = await db.prepare(
      "INSERT INTO USERS (email, password, display_name, photo_url) VALUES (?1, ?2, ?3, ?4)"
    );
    await stmt.bind({
      1: user.email,
      2: user.password,
      3: user.display_name,
      4: user.photo_url,
    });
    const operationResult = await stmt.run();
    await stmt.finalize();
  } catch (error) {
    console.error("Error inserting user:", error);
    return false;
  } finally {
    await db.close();
    return true;
  }
}

async function GetAllUsersFromDB(): Promise<User[]> {
  const db = await DB.createDBConnection();
  try {
    const stmt = await db.prepare(
      "SELECT email, password, display_name, photo_url FROM USERS"
    );
    const result = await stmt.all();
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  } finally {
    await db.close();
  }
}

async function GetUserByEmailFromDB(email: string): Promise<User | null> {
  const db = await DB.createDBConnection();
  try {
    const stmt = await db.prepare(
      "SELECT email, password, display_name, photo_url FROM USERS WHERE email = ?"
    );
    await stmt.bind([email]);
    const result = await stmt.get();
    await stmt.finalize();
    return result || null;
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    throw error;
  } finally {
    await db.close();
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};