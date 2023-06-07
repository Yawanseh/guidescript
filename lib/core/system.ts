/**
 * This function is used to create a system role entry.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns system role entry
 */
export const system = (strings: TemplateStringsArray, ...values: string[]) => {
  const compiledText = strings
    .map((str, i) => str + (values[i] || ""))
    .join("");

  return {
    role: "system",
    content: compiledText,
  };
};
