import { Configuration, OpenAIApi } from "openai";
import { defaultModel } from "../constants";

export const getCompletion = async (
  key: string,
  messages: any,
  model: string,
  temperature: string,
  maxTokens: string
) => {
  try {
    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      messages: messages,
      model: model || defaultModel,
      temperature: Number(temperature),
      max_tokens: Number(maxTokens),
    });

    return completion?.data?.choices[0]?.message?.content.trim() || "";
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to get completion: ${error.message}`);
    } else {
      console.error("An unknown error occurred while trying to get completion");
    }
    throw error;
  }
};
