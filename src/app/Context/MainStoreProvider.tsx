"use client";
import { MainStore, MainStoreHidration } from '@/stores';
import { enableStaticRendering, Provider } from 'mobx-react';
import React, { ReactNode, useContext } from 'react';
import { createContext } from 'react';

enableStaticRendering(typeof window === 'undefined');

let store: MainStore;

const StoreContext = createContext<MainStore | undefined>(undefined);

StoreContext.displayName = 'StoreContext';

export function useMainStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    console.error('useMainStore must be used within MainStoreProvider');
    return;
  }

  // eslint-disable-next-line consistent-return
  return context;
}

function initializeStore(initialData: MainStoreHidration): MainStore {
  const _store = store ?? new MainStore();

  if (initialData) {
    _store.hydrate(initialData);
  }

  // Для SSG и SSR всегда создаем новый стор
  if (typeof window === 'undefined') return _store;

  // Один раз создаем стор на клиенте
  if (!store) store = _store;

  return _store;
}

export const MainStoreProvider = ({
  children,
  hydrationData,
}: {
  children: ReactNode;
  hydrationData: MainStoreHidration;
}) => {
  const store = initializeStore(hydrationData);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
