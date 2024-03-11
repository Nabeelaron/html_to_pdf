import fs, { Dirent } from "fs";
import path from "path";
import helper from "../utility";

import hb from "handlebars";
import {
  FunctionReturnObj,
  PromiseReject,
  PromiseResolve,
} from "../interfaces";

class TemplateLoader {
  private _templateMemory: Map<string, string>;
  private _compiledTemplateContent: Map<string, HandlebarsTemplateDelegate>;
  private readonly templatePath: string;
  private static templateLoaderInstance: TemplateLoader;
  private constructor(templatePath: String) {
    this._templateMemory = new Map();
    this._compiledTemplateContent = new Map();
    if (templatePath && templatePath.trim() == "")
      this.templatePath = <string>process.env["TEMPLATE_PATH"];
    else this.templatePath = <string>templatePath;
  }

  public static instantiate(path: String) {
    if (this.templateLoaderInstance) return this.templateLoaderInstance;
    return new TemplateLoader(path);
  }

  public async loadToMemory() {
    const responseObj: FunctionReturnObj = {
      status: false,
      message: "failed",
    };
    let [err, data] = await helper.safePromise(this.findTemplate());
    if (err) {
      responseObj.err = err;
      return responseObj;
    } else if (data && data.length <= 0) {
      responseObj.err = new Error("no template available");
      return responseObj;
    }

    data.data.forEach((templateFile: string) => {
      data = fs.readFileSync(
        path.resolve(__dirname, this.templatePath, templateFile),
        "utf8"
      );
      this._templateMemory.set(templateFile, data);
    });
    responseObj.status = true;
    responseObj.message = "Load Successful";

    return responseObj;
  }

  private async findTemplate(): Promise<PromiseReject | PromiseResolve> {
    let data: any = fs.readdirSync(path.resolve(__dirname, this.templatePath), {
      withFileTypes: true,
    });
    if (data && data.length <= 0) return Promise.reject({ status: false });
    data = data
      .filter((files: Dirent) => files.name.endsWith(".html"))
      .map((file: Dirent) => file.name);
    return Promise.resolve({ status: true, data });
  }

  public compileForFileGeneration() {
    const responseObj: FunctionReturnObj = {
      status: false,
      message: "empty memory",
    };
    if (this._templateMemory.size < 1) return responseObj;
    let tempCompiledData;
    for (let templateFileName of this._templateMemory.keys()) {
      tempCompiledData = hb.compile(
        this._templateMemory.get(templateFileName),
        {
          strict: true,
        }
      );
      this._compiledTemplateContent.set(templateFileName, tempCompiledData);
    }
    responseObj.status = true;
    responseObj.message = "Compiled successfully";
    responseObj.data = { size: this._compiledTemplateContent.size };
    return responseObj;
  }

  public getCompiledTemplates(): Map<string, HandlebarsTemplateDelegate> {
    return this._compiledTemplateContent;
  }

  public eraseMemory() {
    console.log("Erasing memory...");
    this._templateMemory = new Map();
    this._compiledTemplateContent = new Map();
    console.log("Memory cleared.");
    return true;
  }
}

export { TemplateLoader };
