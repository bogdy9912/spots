// highlight-next-line
import { GenezioDeploy } from "@genezio/types";

// highlight-next-line
@GenezioDeploy()
export class HelloWorldClass {
  hello(name: string): string {
    console.log("DEBUG: Call hello method");
    return "Hello " + name;
  }

  alexaAction(input: string) {
    console.log("This is the received input", input);
  }
}