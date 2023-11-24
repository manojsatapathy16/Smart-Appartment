"use client";

import { store } from "../Store/Store";
import { Provider } from "react-redux";
import { persistStore } from "reduxjs-toolkit-persist";
let persistor = persistStore(store);
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
