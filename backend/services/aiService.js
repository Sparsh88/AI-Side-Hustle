import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateHustleSuggestions = async ({ skills, interests, time, budget }) => {
  const primarySkill = skills ? skills.split(',')[0].trim() : 'your skills';
  const primaryInterest = interests ? interests.split(',')[0].trim() : 'your interests';

  const mockSuggestions = [
    {
      title: `Freelance ${primarySkill} Specialist`,
      description: `Offer your expertise in ${primarySkill} to clients on platforms like Upwork or Fiverr, focusing on ${primaryInterest} projects.`,
      matchReason: `Directly utilizes your skill in ${primarySkill} and aligns perfectly with your interest in ${primaryInterest}.`
    },
    {
      title: `${primaryInterest} Content Creation`,
      description: `Start a blog, YouTube channel, or social media page creating content around ${primaryInterest}.`,
      matchReason: `Fits well within your ${time} schedule and ${budget} budget while exploring your passions.`
    },
    {
      title: `Online ${primarySkill} Tutoring`,
      description: `Teach others what you know about ${primarySkill} through 1-on-1 online sessions or recorded courses.`,
      matchReason: `A highly profitable way to monetize your existing knowledge without requiring much startup capital.`
    },
    {
      title: `Freelance on Upwork / Fiverr`,
      description: `Create a profile on freelance marketplaces offering micro-services related to ${primarySkill} or ${primaryInterest}.`,
      matchReason: `Allows you to work flexibly within your ${time} availability.`
    },
    {
      title: `${primarySkill} Consultant`,
      description: `Provide strategic advice to small businesses or individuals who need help with ${primarySkill}.`,
      matchReason: `Leverages your deep knowledge into a high-ticket, low-overhead business model.`
    },
    {
      title: `Digital Products (Templates/Guides)`,
      description: `Create and sell downloadable guides, templates, or ebooks about ${primaryInterest} or ${primarySkill}.`,
      matchReason: `Highly scalable income that fits a ${budget} budget with zero inventory costs.`
    }
  ];

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '' || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
    console.log('OpenAI API key not configured or placeholder detected. Using intelligent fallback data.');
    return mockSuggestions;
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Generate 6 diverse and personalized side hustle suggestions for someone with:
Skills: ${skills}
Interests: ${interests}
Available Time: ${time}
Budget: ${budget}

Return the response STRICTLY as a JSON object with a "suggestions" array. Each object in the array must have:
"title" (string), "description" (string), "matchReason" (string explaining why it matches their profile).`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });
    
    const parsedResponse = JSON.parse(response.choices[0].message.content);
    return parsedResponse.suggestions || mockSuggestions;
  } catch (error) {
    console.error("OpenAI API Error:", error.message || error);
    console.log("Falling back to mock data due to API error...");
    return mockSuggestions;
  }
};

export const generateHustleRoadmap = async ({ title, description }) => {
  const mockRoadmap = {
    steps: [
      { title: "Research & Plan", description: "Understand the market demand for this hustle and identify your target audience." },
      { title: "Set Up Your Platform", description: "Create accounts on relevant platforms, build a portfolio, or set up your tools." },
      { title: "Launch & Market", description: "Start reaching out to potential clients or posting your first content." },
      { title: "Refine & Scale", description: "Analyze your early results, improve your offering, and increase your rates." }
    ],
    tools: [
      { name: "Google Workspace / Notion", purpose: "For organization and planning" },
      { name: "Social Media Platforms", purpose: "For marketing and client acquisition" },
      { name: "Payment Processor (Stripe/PayPal)", purpose: "To receive payments" }
    ],
    timeline: "2-4 weeks to first earnings"
  };

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '' || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
    console.log('OpenAI API key not configured. Using default roadmap plan.');
    return mockRoadmap;
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Create a detailed, step-by-step action plan for the following side hustle:
Title: ${title}
Description: ${description}

Return the response STRICTLY as a JSON object with the following structure:
{
  "steps": [
    { "title": "Step 1 name", "description": "Detailed explanation of step 1" },
    { "title": "Step 2 name", "description": "Detailed explanation of step 2" }
  ],
  "tools": [
    { "name": "Tool Name", "purpose": "Why this tool is needed" }
  ],
  "timeline": "A short, realistic estimate of how long until the first dollar is earned (e.g. '2-4 weeks')"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API Error for details:", error.message || error);
    return mockRoadmap;
  }
};

export const chatWithBot = async ({ message, history }) => {
  const fallbackReply = {
    reply: "I'm here to help! The AI Side Hustle Finder matches your skills and interests with the best side hustles. Try entering your skills and interests in the Discover tab to explore personalized ideas!"
  };

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '' || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
    return fallbackReply;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const systemPrompt = `You are a helpful and friendly AI assistant for the 'AI Side Hustle Finder' website. 
Your goal is to help users understand how to use the site, provide advice on side hustles, and answer any questions they have.
Keep your answers concise, encouraging, and easy to read.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt
    });

    // Format history for Gemini (Strict alternating required)
    const formattedHistory = [];
    for (const msg of history || []) {
      const role = msg.sender === 'user' ? 'user' : 'model';
      
      // Gemini requires first message to be from 'user'
      if (formattedHistory.length === 0 && role === 'model') continue;
      
      // Gemini requires strictly alternating roles
      if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === role) {
        formattedHistory[formattedHistory.length - 1].parts[0].text += "\n" + msg.text;
      } else {
        formattedHistory.push({ role, parts: [{ text: msg.text }] });
      }
    }

    const chat = model.startChat({
      history: formattedHistory,
    });
    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return { reply: response.text() };
  } catch (error) {
    console.error("Gemini API Error for chat:", error.message || error);
    return fallbackReply;
  }
};

