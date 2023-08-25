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
    organization: "org-sOGHH8iC9iqsGla6JTxx8EbT",
    apiKey: process.env.OPEN_AI_KEY,
  });

// POST request endpoint
app.post("/ask", async (req, res) => {
    console.log(req.body)
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
    });
    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});


// const response = await openai.listEngines().then(console.log(response));

// const inventoriesRoutes = require('./routes/inventories');
// const warehousesRoutes = require('./routes/warehouses');

// app.use("/api/warehouses", warehousesRoutes)
// app.use("/api/inventories" ,inventoriesRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
