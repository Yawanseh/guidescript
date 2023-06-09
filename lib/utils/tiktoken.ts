import { z } from "zod";
import { Tiktoken } from "tiktoken/lite";
import { load } from "tiktoken/load";
import registry from "tiktoken/registry.json";
import models from "tiktoken/model_to_encoding.json";
import { Model, Options, OptionsSchema, TokenizedOutput } from "../types";

/**
 * Tokenizes an array of options using Tiktoken.
 *
 * @param {Options} options The options to tokenize.
 * @param {string} modelName gpt-4 or gpt-3.5-turbo defaults to gpt-3.5-turbo.
 * @returns {Promise<TokenizedOutput>} The tokenized options.
 */
const tokenize = async (
  options: Options,
  modelName: Model
): Promise<TokenizedOutput> => {
  // Validate the input
  const validOptions = OptionsSchema.parse([...options, "-"]);

  const modelEncoding = models[modelName];
  const model = await load((registry as any)[modelEncoding]);

  const encoder = new Tiktoken(
    model.bpe_ranks,
    model.special_tokens,
    model.pat_str
  );

  // For each option, encode it and store the token
  const tokens: TokenizedOutput = {};

  validOptions.forEach((option: string) => {
    tokens[encoder.encode(option)[0].toString()] = 100;
  });

  // Free up memory used by the encoder
  encoder.free();

  return tokens;
};

export default tokenize;
