import { defaultModel } from "./constants";
import { getCompletion } from "./utils/openai";
import { Chat, ExportedData, GuideScriptSchema, GuideScriptType, Message, Model } from "./types";

class GuideScript implements GuideScriptType {
  OpenAIKey: string;
  model: Model;

  constructor(OpenAIKey: string | null = null, model = defaultModel) {
    const validatedData = GuideScriptSchema.parse({
      OpenAIKey,
      model,
    });

    this.OpenAIKey = validatedData.OpenAIKey;
    this.model = validatedData.model;
  }

  async chat(messages: Message[]): Promise<Chat> {
    let conversation: Message[] = [];
    let exportedData: ExportedData = {};

    for (const message of messages) {
      if (message.role === "assistant" && message.content.startsWith("#GEN")) {
        const { keyword, temperature, maxTokens, options, stop } = JSON.parse(
          message?.content?.substring(4)
        );

        await getCompletion({
          key: this.OpenAIKey,
          messages: conversation,
          model: this.model,
          temperature: temperature,
          maxTokens: maxTokens,
          options: options,
          stop,
        }).then((response) => {
          exportedData[keyword] = response;
          conversation.push({
            role: "assistant",
            content: response,
          });
        });

        continue;
      }

      conversation.push(message);
    }

    return { conversation, exportedData };
  }
}

export default GuideScript;
