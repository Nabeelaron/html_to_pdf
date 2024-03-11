enum InternalCode {
  PromiseReject = "IC:001",
  PromiseResolve = "IC:002",
}
interface PromiseBasic {
  status: boolean;
}

export interface PromiseResolve extends PromiseBasic {
  message?: string;
  code?: InternalCode.PromiseResolve;
}

export interface PromiseReject extends PromiseBasic {
  message?: string;
  code: InternalCode.PromiseReject;
}
export interface FunctionReturnObj {
  status: boolean;
  message: string;
  err?: Error;
  data?: Array<any> | { [key: string]: any };
}
