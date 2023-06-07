/**
 * This function is used to create a generate script.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns generated script
 */
export const generate = (
  keyword: string,
  {
    temperature = 0,
    maxTokens = 300,
  }: { temperature?: number; maxTokens?: number } = {}
) =>
  `#GEN[{"keyword":"${keyword}","temperature":"${temperature}","maxTokens":"${maxTokens}"}]`;
