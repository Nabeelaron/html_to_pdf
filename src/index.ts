import { FunctionReturnObj } from "./interfaces";
import { PDFGenerator, TemplateLoader } from "./models";
import * as dotenv from "dotenv";
import helper from "./utility";
dotenv.config();

export function loadAndGenerateFile(
  templateSource: string = "",
  fileDestination: string = ".",
  metaData: { [K: string]: any } = {}
) {
  console.log(
    loadAndGenerateFile.name,
    templateSource,
    fileDestination,
    metaData
  );
  const loader = TemplateLoader.instantiate(templateSource);
  const generator = new PDFGenerator(fileDestination);

  loader.loadToMemory().then(async (data: any) => {
    if (!data.status) {
      console.log("Template loading to memory failed ❌ -> ", data.message);
      return data;
    }
    console.log("Load success ✅");
    let intermediateResponse: FunctionReturnObj =
      loader.compileForFileGeneration();
    if (!intermediateResponse.status) {
      console.log("Compile failed ❌ -> ", intermediateResponse.message);
      return intermediateResponse;
    }
    console.log("Compile success ✅");

    const compiledTemplateMap: Map<string, HandlebarsTemplateDelegate> =
      loader.getCompiledTemplates();

    const promiseArray: Array<Promise<any>> = [];
    for (let [key, _] of compiledTemplateMap) {
      let _content = compiledTemplateMap.get(key)!;
      promiseArray.push(
        generator.generatePDF({ htmlContent: _content({}), fileName: key })
      );
    }
    const result = await helper.safePromise(Promise.all(promiseArray));
    if (result[0]) console.log("Error in file generation");
    else console.log(result[1]);
    return;
  });
}
