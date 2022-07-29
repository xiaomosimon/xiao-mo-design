import type { PropType } from 'vue';
export const definePropType = <T>(val: any): PropType<T> => val;

export const isUndefined = (val: any): val is undefined => val === undefined;

const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (obj: object, val: string | symbol) =>
  _hasOwnProperty.call(obj, val);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};
