export function guidance(input: string) {
  // Define a regex pattern to match each block ({{#role~}}message{{~/role}})
  const blockPattern = /{{#(.*?)~}}((.|\n)*?){{~\/\1}}/g;

  // Define an array to store the parsed output
  let output = [];

  // Iterate over each match in the input
  let match;
  while ((match = blockPattern.exec(input)) !== null) {
    // Extract the role and message from the match
    let role = match[1];
    let message = match[2].trim();

    // Push an object with the role and message into the output array
    output.push({ role, message });
  }

  // Return the output array
  return output;
}
