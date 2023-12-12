const express = require("express");
const bodyParser = require("body-parser");
const { streamToResponse, OpenAIStream } = require("ai");
const OpenAI = require("openai");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3100;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

const upload = multer();

app.post("/audio", upload.single("audio"), async (req, res) => {
  const blob = new Blob([req.file.buffer], { type: "audio/wav" });

  const fileLike = await OpenAI.toFile(blob, "audio.wav");

  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    response_format: "json",
    file: fileLike,
  });

  res.json(response);
});

// POST route
app.post("/copilot", async (req, res) => {
  const forwardedProps = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    ...forwardedProps,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      return undefined; // returning undefined to avoid sending any messages to the client when a function is called. Temporary, bc currently vercel ai sdk does not support returning both text and function calls -- although the API does support it.
    },
  });

  streamToResponse(stream, res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
