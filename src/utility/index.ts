const helper: { [k: string]: any } = {};
helper.safePromise = (promise: Promise<any>) =>
  promise.then((data) => [null, data]).catch((err) => [err, null]);

export default helper;
