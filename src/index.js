import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";

import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StatisticsProvider } from "./context";

import "./index.css";
import './createWeb3Modal'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <StatisticsProvider>
            <App />
          </StatisticsProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
