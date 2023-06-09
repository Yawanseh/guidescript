/**
 * This function is used to create a generate script.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns generated script
 */
export const generate = (
  keyword: string,
  {
    temperature,
    maxTokens,
    stop = [],
  }: { temperature?: number; maxTokens?: number; stop?: string[] }
) =>
  `#GEN${JSON.stringify({
    keyword: keyword,
    temperature: temperature,
    maxTokens: maxTokens,
    stop: stop,
  })}`;
