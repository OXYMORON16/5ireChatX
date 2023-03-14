import React, { useEffect, useState } from "react";
import { Message } from "../types";
import ChatBubble from "./ChatBubble";
import { ethers } from "ethers";

interface Props {
  account?: string;
  chatContract: ethers.Contract | undefined;
}

const Chat = ({ account, chatContract }: Props) => {
  const [textareaContent, setTextareaContent] = useState("");
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>();

  const getMessages = async () => {
    // ...
  };

  // Listen to new message posted
  const setupMessageListener = (): ethers.Contract | void => {
    if (!chatContract) return;

    // .on("EVENT_NAME", callback) to listen to an event
    const msgListener = chatContract.on(
      "NewMessage",
      (address, timestamp, content, _style) => {
        // When a new message is posted, update our "messages" state with "setMessages"
        setMessages((prev) => {
          const newMessage = {
            address,
            date: timestamp._hex,
            content,
          };
          return prev ? [...prev, newMessage] : [newMessage];
        });
      }
    );

    return msgListener;
  };

  const sendMessage = async () => {
    // ...
  };

  useEffect(() => {
    if (!chatContract || messages) return;
    getMessages();
    // Don't forget to call our listener here
    setupMessageListener();
  }, [chatContract]);

  return (
    <div className="chat">
      <div className="chat__messages">
        {!chatContract && (
          <p className="state-message">
            Connect to the chat in order to see the messages!
          </p>
        )}
        {account && messages && messages.length === 0 && (
          <p className="state-message">There is no message to display</p>
        )}
        {messages &&
          messages.length > 0 &&
          messages.map((m, i) => (
            <ChatBubble
              key={i}
              ownMessage={m.address === account}
              address={m.address}
              message={m.content}
            />
          ))}
      </div>
      <div className="chat__actions-wrapper">
        {!account && (
          <p className="state-message">Connect With Metamask to chat!</p>
        )}
        <div className="chat__input">
          <textarea
            disabled={!!txnStatus || !account}
            value={textareaContent}
            onChange={(e) => {
              setTextareaContent(e.target.value);
            }}
          ></textarea>
          <button onClick={sendMessage} disabled={!!txnStatus || !account}>
            {txnStatus || "send message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;