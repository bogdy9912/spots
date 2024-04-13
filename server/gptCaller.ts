import OpenAI from "openai";
import { GenezioDeploy, GenezioMethod } from "@genezio/types";

@GenezioDeploy()
export class GptCaller {
  openai: OpenAI | null = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY,
    });
  }

  @GenezioMethod({ type: "http" })
  async dummyChatGpt(input: string) {
    return { statusCode: "200", body: "I've got you text :wink:" };
  }


  async dummyChatGptLocal(input: string) {
    return { statusCode: "200", body: "I've got you text :wink:" };
  }
  // send a request to the ChatGPT API to get the requestText
  @GenezioMethod({ type: "http" })
  async askChatGPT(requestText: any) {
    console.log("DEBUG 1");

    console.log("This is the req text: ", requestText.body);

    const completion = await this.openai?.chat.completions.create({
      // the used model at the moment of writing this article
      model: "gpt-3.5-turbo",
      // tells ChatGPT to rephrase the requestText
      messages: [{ role: "user", content: requestText.body }],
    });

    console.log("DEBUG 2");

    console.log(
      `DEBUG: request: ${requestText.body}, response: ${completion?.choices[0].message}`
    );
    
    return { statusCode: "200", body: completion?.choices[0].message.content };
  }


}
