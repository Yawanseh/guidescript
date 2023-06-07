/**
 * This function is used to create a role entry.
 * @param role The role for the entry
 * @param strings as a template string
 * @param values each value in the template string
 * @returns role entry
 */
const createRoleEntry =
  (role: string) =>
  (strings: TemplateStringsArray, ...values: string[]) => {
    const compiledText = strings
      .map((str, i) => str + (values[i] || ""))
      .join("");

    return {
      role: role,
      content: compiledText,
    };
  };

export default createRoleEntry;
