require('dotenv').config()
const express = require('express');
const cors = require('cors');
const upload = require('express-fileupload');
const { extractTextFromPDF } = require('./services/textExtractionService');
const { textParser } = require('./services/googleGeminiService');

const app = express();

app.use(express.json());
app.use(cors());
app.use(upload());

app.post('/', async (req, res) => {
    const fileData = req.files.inputFile.data;
    try {
        if (fileData) {
            const text = await extractTextFromPDF(fileData);

            const parsedText = (await textParser(text)).replace(/\\n/g, ' ');

            res.status(200).json(parsedText);
        }
    } catch (error) {
        res.status(500).json("Parsing failed!");
        console.log(error);
        throw error;
    }

});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})