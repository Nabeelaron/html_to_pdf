import fs, { Dirent } from "fs";
import path from "path";

// import helper from "../utility";

//load html templates
//verify if its HTML content
//compile for file generation
class TemplateLoader {
  private _templateMemory;
  private readonly templatePath: string;
  private static templateLoaderInstance: TemplateLoader;

  private constructor(templatePath: String) {
    this._templateMemory = new Map();
    if (templatePath && templatePath.trim() == "")
      this.templatePath = <string>process.env["TEMPLATE_PATH"];
    else this.templatePath = <string>templatePath;
  }

  public static instantiate(path: String) {
    if (this.templateLoaderInstance) return this.templateLoaderInstance;
    return new TemplateLoader(path);
  }

  public describeInternalState() {
    console.log(this.templatePath);
    console.log(this._templateMemory);
  }
  loadToMemory() {
    this.findTemplate();
    //   this.verifyContent();
    //load to memory
  }

  private async findTemplate(): Promise<any> {
    let data: any = fs.readdirSync(path.resolve(__dirname, this.templatePath), {
      withFileTypes: true,
    });
    data = data.filter((files: Dirent) => files.name.endsWith(".html")).map((file:Dirent)=>file.name);
    console.log(data);
    return Promise.resolve();
  }

  //   private verifyContent() {}

  //   compileForFileGeneration() {}
}

export { TemplateLoader };
