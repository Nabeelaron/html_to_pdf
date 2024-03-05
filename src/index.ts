import { TemplateLoader } from "./models";

const loader = TemplateLoader.instantiate("../templates");
loader.describeInternalState();
loader.loadToMemory();
// loader.compile();
// PDFGenerator.generatePDF();
