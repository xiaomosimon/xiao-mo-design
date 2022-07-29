export const defaultNamespace = 'xiao';
const statePrefix = 'is-';

const _bem = (
  namespace: string,
  block: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (element) {
    cls += `-${element}`;
  }
  if (modifier) {
    cls += `__${modifier}`;
  }
  return cls;
};

const useNamespace = (block: string) => {
  const namespace = defaultNamespace;
  const b = () => _bem(namespace, block, '', '');
  const e = (element?: string) =>
    element ? _bem(namespace, block, element, '') : '';
  const m = (modifier?: string) =>
    modifier ? _bem(namespace, block, '', modifier) : '';
  const bem = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace, block, element, modifier) : '';
  const is = (name: string) => (name ? `${statePrefix}${name}` : '');
  return {
    namespace,
    b,
    e,
    m,
    bem,
    is,
  };
};

export default useNamespace;
