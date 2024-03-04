import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getResponsefromAI(question) {
  const requestData = {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: `${question}` }],
  };

  const headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      requestData,
      { headers }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
