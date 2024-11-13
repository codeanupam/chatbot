const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai'); // Importing OpenAI from the openai package
const fs = require('fs');
const cors = require('cors'); // Import the CORS package
require('dotenv').config();

const app = express();
const port = 5000;

// Initialize OpenAI API client with API key directly from environment
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for all routes
app.use(cors());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Endpoint to handle file upload and generate test cases
app.post('/generate-tests', upload.single('codeFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { language } = req.body;

    // Read the uploaded file's content
    const codeContent = fs.readFileSync(req.file.path, 'utf-8');

    try {
        // Prepare the prompt for OpenAI API
        const prompt = `Generate unit test cases for the following ${language} code:\n\n${codeContent}`;

        // Make the OpenAI API request using the correct method
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use 'gpt-3.5-turbo' or 'gpt-4' if you have access
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
        });

        // Get the generated test cases
        const testCases = response.choices[0].message.content.trim();

        // Send the generated test cases as the response
        res.json({ testCases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate test cases' });
    } finally {
        // Clean up the uploaded file asynchronously
        fs.promises.unlink(req.file.path).catch(err => console.error('Error deleting file:', err));
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
