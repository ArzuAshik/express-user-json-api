const fs = require("fs");
module.exports.getDB = function () {
    const db = fs.readFileSync("users.json");
    return JSON.parse(db);
}