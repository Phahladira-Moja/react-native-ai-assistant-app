import { API_KEY } from "@env";
import axios from "axios";

const client = axios.create({
  headers: {
    Authorization: "Bearer " + API_KEY,
    "Content-Type": "application/json",
  },
});

const chatGptEndpoint = "https://api.openai.com/v1/chat/completions";
const dalleEndpoint = "https://api.openai.com/v1/images/generations";

export const apiCall = async (prompt, messages) => {
  try {
    const result = await client.post(chatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
        },
      ],
    });

    let isArt = result.data?.choices[0].message?.content;

    if (isArt.toLowerCase().includes("yes")) {
      return dalleApiCall(prompt, messages || []);
    } else {
      return chatgptApiCall(prompt, messages || []);
    }
  } catch (error) {
    console.log("Api call error: ", error);
    return Promise.resolve({
      success: false,
      msg: error.message,
    });
  }
};

const chatgptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages,
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({
      role: "assistant",
      content: answer.trim(),
    });

    return Promise.resolve({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("Chat GPT call error: ", error);
    return Promise.resolve({
      success: false,
      msg: error.message,
    });
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndpoint, {
      prompt,
      n: 1,
      size: "512x512",
    });

    let url = res?.data?.data[0]?.url;
    console.log("got url of the image: ", url);

    messages.push({
      role: "assistant",
      content: url,
    });

    return Promise.resolve({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("Dall-E call error: ", error);
    return Promise.resolve({
      success: false,
      msg: error.message,
    });
  }
};
