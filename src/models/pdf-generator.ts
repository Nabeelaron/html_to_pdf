import * as puppeteer from "puppeteer";
import * as path from "path";
import { FunctionReturnObj } from "../interfaces";

class PDFGenerator {
  _engine!: puppeteer.Browser;
  _outDir: string;
  constructor(destination: string) {
    this._outDir = destination;
  }
  // private createHelpers() {}
  // private getAssets() {}

  public async initializeEngine() {
    const responseObj: FunctionReturnObj = {
      status: true,
      message: "engine initialized",
    };
    try {
      const configObj = {
        headless: true,
        args: [
          "--disable-features=IsolateOrigins",
          "--disable-site-isolation-trials",
          "--autoplay-policy=user-gesture-required",
          "--disable-background-networking",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-breakpad",
          "--disable-client-side-phishing-detection",
          "--disable-component-update",
          "--disable-default-apps",
          "--disable-dev-shm-usage",
          "--disable-domain-reliability",
          "--disable-extensions",
          "--disable-features=AudioServiceOutOfProcess",
          "--disable-hang-monitor",
          "--disable-ipc-flooding-protection",
          "--disable-notifications",
          "--disable-offer-store-unmasked-wallet-cards",
          "--disable-popup-blocking",
          "--disable-print-preview",
          "--disable-prompt-on-repost",
          "--disable-renderer-backgrounding",
          "--disable-setuid-sandbox",
          "--disable-speech-api",
          "--disable-sync",
          "--hide-scrollbars",
          "--ignore-gpu-blacklist",
          "--metrics-recording-only",
          "--mute-audio",
          "--no-default-browser-check",
          "--no-first-run",
          "--no-pings",
          "--no-sandbox",
          "--no-zygote",
          "--password-store=basic",
          "--use-gl=swiftshader",
          "--use-mock-keychain",
        ],
      };

      this._engine = await puppeteer.launch({ ...configObj });
    } catch (err: any) {
      responseObj.status = false;
      responseObj.message = err ? err.message : "Error <unknown>";
    }
    return responseObj;
  }

  public async generatePDF(htmlObj: { htmlContent: string; fileName: string }) {
    const responseObj: FunctionReturnObj = {
      status: true,
      message: "PDF generated",
    };
    try {
      await this.initializeEngine();
      let page = await this._engine.newPage();
      await page.setContent(htmlObj.htmlContent);
      await page.pdf({
        path: path.resolve(`${this._outDir}/${htmlObj.fileName}.pdf`),
        format: "A4",
      });
    } catch (err: any) {
      responseObj.status = false;
      responseObj.message = err ? err.message : "Error <unknown>";
    }
    return responseObj;
  }
  // get generatedPDF() {}
}

export { PDFGenerator };
