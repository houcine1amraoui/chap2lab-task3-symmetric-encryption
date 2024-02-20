import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { users } from "./users.js";

const app = express();
app.use(express.json());

const session_key = "test123";

app.post("/login", async (req, res) => {
  const { username, encryptedPassword } = req.body;

  const decipher = crypto.createDecipher("aes-256-cbc", session_key);
  let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf-8");
  decryptedPassword += decipher.final("utf-8");

  const result = users.filter((user) => {
    return user.username === username;
  });
  var match = false;
  if (result) {
    console.log(result[0]);
    match = await bcrypt.compare(decryptedPassword, result[0].hashedPassword);
  }
  return res.send(match);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
