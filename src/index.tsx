import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "aos/dist/aos.css";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Modal from "react-modal";

Modal.setAppElement('#root');


const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

const { chains } = configureChains(
  [chain.goerli],
  [
    jsonRpcProvider({
      rpc: (chain: any) => ({
        http: `https://eth-goerli.g.alchemy.com/v2/${alchemyId}`,
        webSocket: `wss://eth-goerli.g.alchemy.com/v2/${alchemyId}`,
      }),
    }),
  ]
);

const client = createClient(
  getDefaultClient({
    appName: "PiggyBank",
    chains,
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
