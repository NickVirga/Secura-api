const { OpenAI } = require("openai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

const openai = new OpenAI({
  // organization: "org-sOGHH8iC9iqsGla6JTxx8EbT",
  apiKey: process.env.OPEN_AI_KEY,
});


// POST request endpoint
app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("No prompt was provided");
    }
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 30,
    });
    const response = completion.choices[0].text;
    return res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
