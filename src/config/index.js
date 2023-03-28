import dotenv from "dotenv/config";

const cfg = (keyName, parseFunc = String) => parseFunc(process.env[keyName]);

export default cfg;
