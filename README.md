
# GuideScript

GuideScript is a JavaScript/TypeScript library that brings the concept of [Guidance](https://github.com/microsoft/guidance) to your applications. Inspired by Microsoft's [Guidance](https://github.com/microsoft/guidance) package, GuideScript allows you to control language models more effectively and efficiently, but now in a JavaScript or TypeScript environment.

## Features

- Intuitive syntax: Define your language model interactions in a simple and clear way.
- Supports role-based chat models: Use constructs like `system`, `user`, and `assistant` to define interactive dialogs.
- Seamless integration with OpenAI models: Specifically supports 'gpt-4' and 'gpt-3.5-turbo' models.
- Enables structured output: Interleave generation, prompting, and logical control for a richly structured interaction flow.

## Installation

```bash
npm install guidescript
```

## Example Usage

Here's a basic example of how to use GuideScript to structure a chat with the language model.

```javascript
import GuideScript, { assistant, generate, system, user } from "../index";

// Initialize GuideScript with your OpenAI API Key and desired model
const guidescript = new GuideScript("OPENAI_API_KEY", "gpt-3.5-turbo");

// Define a question
const question = "What is the meaning of life?";

// Define the chat flow
const chatFlow = [
  system`You are a helpful assistant.`,
  user`I would like to know the answer to the following question:
  ${question}
  Can you suggest 3 world-class experts (past or present) who would be great at answering this question? Please don't provide an answer or comment on the question at this point.`,
  assistant`${generate("experts", { temperature: 0, maxTokens: 300 })}`,
  user`Thanks for the suggestions. Now, please provide an answer as if these experts had collaborated in writing a joint anonymous answer. Their identities should not be revealed, and it should not be obvious that a panel of experts provided the answer. If the experts would disagree, present their different positions as alternatives in the answer itself (e.g., 'Some might argue... others might argue...'). Begin your answer with the word "ANSWER:"`,
  assistant`${generate("answer", { temperature: 0, maxTokens: 500 })}`,
];

// Execute the chat and log the response
guidescript.chat(chatFlow).then(response => console.log(response));
```

In this example, we define a question, structure a chat around this question, and use the chat method to execute this chat with the language model.

