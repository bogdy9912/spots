import OpenAI from "openai";
import { GenezioDeploy, GenezioHttpRequest, GenezioMethod } from "@genezio/types";
import { StripeService } from "./StripeService";

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


  async askChatGPTLocal(requestText: string) {
     
    //CARD CASE
    if(requestText == "card"){
      let stripe: StripeService = new StripeService();
      stripe.createCheckoutSession();
    }
    
    //CRYPTO CASE


    // CHAT GPT CASE
    
    else{
      const completion = await this.openai?.chat.completions.create({
        // the used model at the moment of writing this article
        model: "gpt-3.5-turbo",
        // tells ChatGPT to rephrase the requestText
        messages: [{ role: "user", content: requestText }],
      });
      return { statusCode: "200", body: completion?.choices[0].message.content};
    }
    
    // console.log(
    //   `DEBUG: request: ${requestText}, response: ${completion?.choices[0].message}`
    // );
    
    return 1;

  }
}
