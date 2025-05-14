const pdf = require('pdf-parse');

const extractTextFromPDF = async (dataBuffer) => {
    try {
        const data = await pdf(dataBuffer);
        //console.log("📄 Extracted Text:\n", data.text);
        return data.text;
    } catch (error) {
        console.log("Error occured in textExtractionService", error);
        throw error;
    }
};

module.exports = { extractTextFromPDF };
