"use client";
import React from "react";
import { store } from "./store";
import { Provider } from 'react-redux'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
