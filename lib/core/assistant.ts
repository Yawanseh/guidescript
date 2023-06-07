/**
 * This function is used to create a assistant role entry.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns assistant role entry
 */
export const assistant = (
  strings: TemplateStringsArray,
  ...values: string[]
) => {
  const compiledText = strings
    .map((str, i) => str + (values[i] || ""))
    .join("");

  return {
    role: "assistant",
    content: compiledText,
  };
};
