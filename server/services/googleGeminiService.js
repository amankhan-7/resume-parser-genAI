const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const referenceFile = fs.readFileSync(__dirname + "/../reference.json", "utf8");

const textParser = async (textInput) => {
    try {
       // model name
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `"${textInput}" DO NOT USE CHARACTERS LIKE "/n" or "/t" IN THE FINAL RESULT AND Parse the given data in a perfectly syntactic JSON object. DO NOT ADD UNNECESSARY CHARACTERS LIKE BACKTICKS AT THE STARTING OF JSON. USE ${referenceFile} FOR REFERENCE AND PUT "null" IN ALL THE UNAVAILABLE FIELDS.`

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.log("Error in googleGeminiService.js: ", error);
        throw error;
    }
};

module.exports = { textParser };
