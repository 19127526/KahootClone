import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {persistor, store} from "./store/Store";
import {PersistGate} from "redux-persist/integration/react";
import Loading from "./components/loading/LoadingComponent";
import customTheme from "./utils/theme";
import {ChakraProvider} from "@chakra-ui/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();