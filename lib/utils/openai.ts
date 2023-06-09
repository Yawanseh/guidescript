import { Configuration, OpenAIApi } from "openai";
import tokenize from "./tiktoken";
import { CompletionInputs } from "../types";
import { CompletionInputsSchema } from "../types";

export const getCompletion = async (
  completionInputs: CompletionInputs
): Promise<string> => {
  try {
    const validCompletionInputs =
      CompletionInputsSchema.parse(completionInputs);

    const { key, maxTokens, messages, model, options, stop, temperature } =
      validCompletionInputs;

    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);

    let logitBias = {};

    if (options?.length) {
      logitBias = await tokenize(options, model);
      stop.push("-");
    }

    const completion = await openai.createChatCompletion({
      messages: messages,
      model: model,
      temperature: temperature,
      max_tokens: maxTokens,
      logit_bias: logitBias,
      stop: stop.length ? stop : "",
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
