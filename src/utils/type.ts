const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const isUndefined = (val: any): val is undefined => val === undefined;
export const hasOwn = (obj: object, val: string | symbol) =>
  _hasOwnProperty.call(obj, val);
