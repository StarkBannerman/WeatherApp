import axios from "axios";
import { APP_URL } from "../constants.js";
import React, { useState, useEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import ChatWindow from "../Components/botComponents/ChatWindow.jsx";
export default function ChatComponent(props) {
  const [chats, setChats] = useState([]);

  const getResponseFromAI = async (question) => {
    try {
      const response = await axios.post(`${APP_URL}/bot`, {
        question: question,
      });

      return response.data.response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <Box sx={{ width: "100vw", minHeight: "100vh" }}>
      <ChatWindow />
    </Box>
  );
}
