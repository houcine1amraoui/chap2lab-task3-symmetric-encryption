import axios from "axios";
import crypto from "crypto";

const session_key = "test123";

const login = async () => {
  const username = "mohamed-msila";
  const password = "mohamed2024";
  const cipher = crypto.createCipher("aes-256-cbc", session_key);
  let encryptedPassword = cipher.update(password, "utf-8", "hex");
  encryptedPassword += cipher.final("hex");
  const options = {
    method: "POST",
    url: "http://localhost:3000/login",
    data: {
      username,
      encryptedPassword,
    },
  };
  const response = await axios.request(options);
  console.log(response.data);
};

login();
console.log("End.");
