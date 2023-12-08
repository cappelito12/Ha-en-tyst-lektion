const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    // Anropa OpenAI API för att få ett svar baserat på användarens meddelande
    const response = await getOpenAIResponse(message);

    res.json({ reply: response });
});

// Funktion för att anropa OpenAI API
async function getOpenAIResponse(userMessage) {
    const openaiApiKey = 'YOUR_OPENAI_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const apiResponse = await axios.post(apiUrl, {
            prompt: userMessage,
            max_tokens: 50,  // Justera efter behov
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
        });

        return apiResponse.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        return 'Ett fel uppstod vid hanteringen av din förfrågan.';
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
