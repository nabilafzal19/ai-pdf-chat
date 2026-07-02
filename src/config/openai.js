const OpenAI = require("openai");

exports.openAiclient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});