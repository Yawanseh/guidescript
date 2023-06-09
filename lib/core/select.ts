/**
 * This function is used to create a generate based on options.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns generated script
 */
export const select = (
  keyword: string,
  {
    temperature,
    maxTokens,
    options,
    stop = [],
  }: {
    temperature?: number;
    maxTokens?: number;
    options: string[];
    stop?: string[];
  }
) =>
  `#GEN${JSON.stringify({
    keyword: keyword,
    temperature: temperature,
    maxTokens: maxTokens,
    options: options,
    stop: stop,
  })}`;
