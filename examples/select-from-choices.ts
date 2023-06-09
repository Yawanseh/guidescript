import { config } from "dotenv";
import GuideScript, { assistant, select, user } from "../index";
import { Chat } from "../lib/types";

config();

const guidescript = new GuideScript(
  process.env.OPENAI_API_KEY,
  "gpt-3.5-turbo"
);

const query: string = "I hate tacos";

guidescript
  .chat([
    user`Is the following sentence offensive? Please answer with a single word, either "Yes", "No", or "Maybe".
    Sentence: ${query}`,
    assistant`${select("answer", {
      options: ["Yes", "No", "Maybe"],
    })}`,
  ])
  .then((response: Chat) => console.log(response));
