import { z } from "zod";
import { defaultModel } from "./constants";
import { getCompletion } from "./utils/openai";

const GuideScriptSchema = z.object({
  OpenAIKey: z.string(),
  model: z
    .string()
    .optional()
    .refine(
      (value) => {
        return value === "gpt-4" || value === "gpt-3.5-turbo";
      },
      {
        message:
          "Invalid model value. Available options are 'gpt-4' and 'gpt-3.5-turbo'.",
        path: ["model"],
      }
    ),
});

type GuideScriptType = z.infer<typeof GuideScriptSchema>;

class GuideScript implements GuideScriptType {
  OpenAIKey: string;
  model?: string;

  constructor(OpenAIKey: string | null = null, model = defaultModel) {
    const validatedData = GuideScriptSchema.parse({
      OpenAIKey,
      model,
    });

    this.OpenAIKey = validatedData.OpenAIKey;
    this.model = validatedData.model;
  }

  async chat(messages: any) {
    console.time("chat");

    let messageFlow = [] as any;
    let messageDetails = {} as any;

    for (const message of messages) {
      if (message.role === "assistant" && message.content.startsWith("#GEN")) {
        const { keyword, temperature, maxTokens } = JSON.parse(
          message?.content?.substring(4)
        )[0];

        await getCompletion(
          this.OpenAIKey,
          messageFlow,
          this.model || defaultModel,
          temperature,
          maxTokens
        ).then((response) => {
          messageDetails[keyword] = response;
          messageFlow.push({
            role: "assistant",
            content: response,
          });
        });

        continue;
      }

      messageFlow.push(message);
    }

    return { messageFlow, messageDetails };
  }
}

export default GuideScript;
