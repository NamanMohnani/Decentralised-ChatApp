import React, { useEffect, useState, useContext } from "react";

// internal import
import { ChatAppContext } from "../Context/ChatAppContext";

const ChatApp = () => {
  const { title } = useContext(ChatAppContext);
  return <div>hello</div>;
};

export default ChatApp;
