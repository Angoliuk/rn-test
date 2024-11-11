import type { StoreApi, UseBoundStore } from 'zustand';

import { Linking } from 'react-native';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? { use: { [K in keyof T]: () => T[K] } } & S
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store(s => s[k as keyof typeof s]);
  }

  return store;
};
