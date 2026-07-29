require('dotenv').config()
const axios = require('axios')

exports.gemini = async (req, res) => {
  try {
    const { location, budget, people, theme, budget_type } = req.body;

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured in .env' });
    }

    const prompt = `
    i want you to do deep research and find me places within ${location} where a number of ${people} people can have a theme of ${theme} within a budget of ${budget} naira ${budget_type}
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
  "rating": ?/10,
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

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that responds only with valid JSON. Do not include any markdown, code fences, or extra text. Return only raw JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 8192
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://fun-spot.netlify.app',
          'X-OpenRouter-Title': 'Fun Spot'
        }
      }
    );

    const text = response.data.choices[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const answer = JSON.parse(clean);

    // Normalize: AI sometimes returns "options" (plural) instead of "option" (singular)
    answer.option = answer.option || answer.options || [];

    // Clear any fake AI-generated image URLs before Pexels overwrites them
    answer.option.forEach(place => { place.images = []; });

    // Fetch real images from Pexels for each place
    const PEXEL_API_KEY = process.env.PEXEL_API_KEY;
    if (PEXEL_API_KEY && answer.option.length > 0) {
      const imagePromises = answer.option.map(async (place) => {
        try {
          const query = encodeURIComponent(place.location_name || place.location || '');
          if (!query) return;

          const pexelRes = await axios.get(
            `https://api.pexels.com/v1/search?query=${query}&per_page=3`,
            {
              headers: {
                'Authorization': PEXEL_API_KEY
              }
            }
          );

          if (pexelRes.data.photos && pexelRes.data.photos.length > 0) {
            place.images = pexelRes.data.photos.map(p => p.src.large);
          }
        } catch (imgErr) {
          console.error(`Pexels error for ${place.location_name}:`, imgErr.message);
          // Leave images as empty array if Pexels fails
        }
      });

      await Promise.all(imagePromises);
    }

    res.status(200).json({ message: "Event Generated Successfully", answer });
  } catch (err) {
    console.error('OpenRouter error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
};
