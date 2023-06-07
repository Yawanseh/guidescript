import GuideScript, { assistant, generate, system, user } from "../index";

const guidescript = new GuideScript(
  "OPENAI_API_KEY",
  "gpt-3.5-turbo"
);

const query: string = "What is the meaning of life?";

guidescript
  .chat([
    system`You are a helpful assistant.`,
    user`I want a response to the following question:
    ${query}
    Who are 3 world-class experts (past or present) who would be great at answering this?
    Please don't answer the question or comment on it yet.`,
    assistant`${generate("experts", { temperature: 0, maxTokens: 300 })}`,
    user`Great, now please answer the question as if these experts had collaborated in writing a joint anonymous answer.
    In other words, their identity is not revealed, nor is the fact that there is a panel of experts answering the question.
    If the experts would disagree, just present their different positions as alternatives in the answer itself (e.g. 'some might argue... others might argue...').
    Please start your answer with ANSWER:`,
    assistant`${generate("answer", { temperature: 0, maxTokens: 500 })}`,
  ])
  .then((response: any) => console.log(response));
