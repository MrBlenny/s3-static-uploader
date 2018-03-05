export type IFunctionToPromisify = (err: any, data: any) => (void);

export function promisify (
  functionToPromisify: IFunctionToPromisify, 
  alwaysResolve?: boolean
) {
  return function (params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      functionToPromisify(params, (err: any, data: any) => {
        if (err) {
          if (alwaysResolve) {
            resolve(err);
          } else {
            reject(err);
          }
        } else {
          resolve(data);
        }
      });
    });
  }
};

