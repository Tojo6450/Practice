require("dotenv").config();
const express = require ("express")
const path = require("path")
const cors = require('cors');

const {GoogleGenAI} = require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const app = express()

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hi")
})

app.post("/api", async(req,res)=>{
  try{
    const {prompt} = req.body;
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash-lite",
        contents:prompt,
    });

   let rawText = response.text;
//    const cleanedText = rawText.replace(/^```json\s*/,"")
    //    .replace(/```$/,"").trim();

    // const data = JSON.parse(cleanedText);
    res.status(200).json(rawText) 
  }
  catch(err){
      res.status(500).json({ error: "Failed to generate response" });
  }
  
})

app.listen(8000,()=>{
    console.log('server started')
})
