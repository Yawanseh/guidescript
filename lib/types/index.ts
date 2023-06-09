import z from "zod";
import { defaultModel } from "../constants";

export const OptionsSchema = z.array(z.string());
export const ExportedDataSchema = z.record(z.any());
export const TokenizedOutputSchema = z.record(z.number());
export const RoleSchema = z.enum(["user", "assistant", "system"])

export type Options = z.infer<typeof OptionsSchema>;
export type ExportedData = z.infer<typeof ExportedDataSchema>;
export type TokenizedOutput = z.infer<typeof TokenizedOutputSchema>;
export type Role = z.infer<typeof RoleSchema>;

export const ModelSchema = z
  .enum(["gpt-4", "gpt-3.5-turbo"])
  .optional()
  .default(defaultModel);

export const MessageSchema = z.object({
  role: RoleSchema,
  content: z.string(),
  name: z.string().optional(),
});
export const CompletionInputsSchema = z.object({
  key: z.string(),
  maxTokens: z.number().default(16),
  messages: z.array(MessageSchema),
  model: ModelSchema,
  options: OptionsSchema.optional(),
  stop: z.array(z.string()).optional().default([]),
  temperature: z.number().min(0).max(2).default(1),
});

export type CompletionInputs = z.infer<typeof CompletionInputsSchema>;

export const GuideScriptSchema = z.object({
  OpenAIKey: z.string(),
  model: ModelSchema,
});

export type Message = z.infer<typeof MessageSchema>;
export type Model = z.infer<typeof ModelSchema>;
export type GuideScriptType = z.infer<typeof GuideScriptSchema>;

export const ChatSchema = z.object({
  conversation: z.array(MessageSchema),
  exportedData: ExportedDataSchema,
});

export type Chat = z.infer<typeof ChatSchema>;
