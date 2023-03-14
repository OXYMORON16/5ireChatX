import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import BlockchainChatArtifact from "./contract/BlockchainChat-artifact.json";
import useChatContract from "./useChatContract";

function App() {
  const contractAddress = "[CONTRACT_ADDRESS]";
  const [account, setAccount] = useState<string>();
  // use useChatContract here
  const chatContract = useChatContract(
    contractAddress,
    BlockchainChatArtifact.abi,
    account
  );
    
  return (
    <div className="App">
      <Sidebar setAccount={setAccount} account={account} />
      <Chat account={account} chatContract={chatContract} />
    </div>
  );
}

export default App;