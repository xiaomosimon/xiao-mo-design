export {};
// import type { Ref } from 'vue';

// export function useGlobalConfig<
//   K extends keyof ConfigProviderContext,
//   D extends ConfigProviderContext[K]
// >(
//   key: K,
//   defaultValue?: D
// ): Ref<Exclude<ConfigProviderContext[K], undefined> | D>
// export function useGlobalConfig(): Ref<ConfigProviderContext>
// export function useGlobalConfig(
//   key?: keyof ConfigProviderContext,
//   defaultValue = undefined
// ) {
//   const config = getCurrentInstance()
//     ? inject(configProviderContextKey, globalConfig)
//     : globalConfig;
//   if (key) {
//     return computed(() => config.value?.[key] ?? defaultValue);
//   } else {
//     return config;
//   }
// }