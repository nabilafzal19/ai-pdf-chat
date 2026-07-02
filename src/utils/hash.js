const fs = require("fs");
const crypto = require("crypto");

const generateHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);

    return crypto
        .createHash("sha256")
        .update(fileBuffer)
        .digest("hex");
};

module.exports = {
    generateHash,
};