require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};


app.use(express.json());
app.use(cors(corsOptions));


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
    console.log("POST /chat hit");

    const { message } = req.body;
    console.log("Message received:", message);

    const messages = [{
        role: 'system',
        content: `
            You are a bible scholar chatbot that answers questions about the Bible and everything related to Christianity.
            Your response should be markdown format, highlighting important people or figures and adding relevant scriptures/links where necessary.
            You'll be should provide very concise response to the question below:
        `
      },
      {
        role: 'user',
        content: message
      },
    ];      
  
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Expected messages to be an array' });
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
      });
  
      const reply = response.choices[0].message.content.trim();
      res.json({ reply });
    } catch (err) {
      console.error('OpenAI API error:', err);
      res.status(500).json({ error: 'Failed to get chat completion' });
    }
  });


  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
