import bcrypt from "bcrypt";

const password = "elamela1elamela1";
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
console.log("HASHED PASSWPRD", hash);
