const fs = require("fs");
module.exports.setDB = function (data) {
    fs.writeFileSync("users.json", JSON.stringify(data, null, "\t"))
    return data;
}