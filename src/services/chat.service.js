const {openAiclient} = require('../config/openai')
const queryService = require("./query.service");

const chat = async (question) => {

    // Step 1
    const searchResult = await queryService.search(question);

    // Step 2
    const context = searchResult.documents[0].join("\n\n");

    // Step 3
    const response = await openAiclient.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

            {
                role: "system",
                content: `
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer isn't available in the context,
say:
"I couldn't find that information in the uploaded document."

Never use outside knowledge.
`
            },

            {
                role: "system",
                content: `
Retrieved Context:

${context}
`
            },

            {
                role: "user",
                content: question
            }

        ]

    });

    return response.choices[0].message.content;

};

module.exports = {
    chat
};