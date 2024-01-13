import * as readline from "readline";
import ICommand from "../interfaces/command.interface";

export class Disply {

  private currentIndex = 0;

  constructor(private title: string, private menuItems: ICommand[]) {}

  private colorText(text: string, color: string): string {
    const colorCodes: Record<string, string> = {
      reset: "\x1b[0m",
      green: "\x1b[32m",
      blue: "\x1b[34m",
    };
    return `${colorCodes[color] || colorCodes.reset}${text}${colorCodes.reset}`;
  }

  private renderMenu(): void {
    console.clear();
    console.log(this.colorText(` PLEASE, SELECT ITEM: `, "blue"));
    this.menuItems.forEach((item, i) =>
      console.log(
        i === this.currentIndex
          ? this.colorText(`→ ${item.name}`, "green")
          : `  ${item.name}`
      )
    );
  }

  private async inputText(prompt: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((res) => {
      rl.question(prompt, (answer: string) => {
        rl.close();
        res(answer);
      });
    });
  }

  async run(): Promise<{ selectedItem: string; text: string }> {

    return new Promise(async (resolve, reject) => {

      const handleKeyPress = async (str: string, key: readline.Key) => {
        
        if (key.name === "up") {
          this.currentIndex =
            this.currentIndex > 0
              ? this.currentIndex - 1
              : this.menuItems.length - 1;
        } 
        
        else if (key.name === "down") {
          this.currentIndex =
            this.currentIndex < this.menuItems.length - 1
              ? this.currentIndex + 1
              : 0;
        } 
        
        else if (key.name === "return") {
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.removeListener("keypress", handleKeyPress);

          const text = await this.inputText(
            this.colorText(`2. PLEASE, ENTER ADDITIONAL INFORMATION: `, "blue")
          );

          //return resolve({ selectedItem: this.menuItems[this.currentIndex], text });
        } else if (key.name === "c" && key.ctrl) process.exit(0);

        this.renderMenu();
      };

      readline.emitKeypressEvents(process.stdin);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
      }
      process.stdin.on("keypress", handleKeyPress);
      this.renderMenu();
    });
  }
}

