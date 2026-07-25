require('dotenv').config()
const express = require('express')
// controllers/geminiController.js
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.gemini = async (req, res) => {
  try {
    const { location, budget, people , theme} = req.body; // pull only what you need

    // Fixed prompt template with variables plugged in
   const prompt = `
    i want you to do deep research and find me places within ${location} where a number of ${people} people can have a theme of ${theme} within a budget of ${budget} naira 
    and return a json response like this
    let there be as many options as you can recommend
    option: [{
  "location": "",
  "theme" : "",
  "location_name": "",
  "address": "",
  "google_maps_url": "",
  "group_size": ,
  "total_budget_ngn": ,
  "images": [],
  "activity_breakdown": [
    {
      "activity": "",
      "estimated_cost_ngn": ,
      "details": ""
    }
  ],
  "estimated_total_spent_ngn": ,
  "recommendations": ""
  }, {}]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const clean = response.text.replace(/```json|```/g, '').trim();
    const answer = JSON.parse(clean);

    res.status(200).json({ message: "Event Generated Successfully", answer });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ success: false, error: 'Failed to generate quiz' });
  }
};

exports.create = async(req, res) => {
    
}