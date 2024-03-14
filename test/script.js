import { loadAndGenerateFile } from "template_html_to_pdf";
import { fileURLToPath } from "url";
import * as path from "path";

loadAndGenerateFile(path.dirname(fileURLToPath(import.meta.url)));
