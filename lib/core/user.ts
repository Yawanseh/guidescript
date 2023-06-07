/**
 * This function is used to create a user role entry.
 * @param strings as a template string
 * @param values each value in the template string
 * @returns user role entry
 */
export const user = (strings: TemplateStringsArray, ...values: string[]) => {
  const compiledText = strings
    .map((str, i) => str + (values[i] || ""))
    .join("");

  return {
    role: "user",
    content: compiledText,
  };
};
