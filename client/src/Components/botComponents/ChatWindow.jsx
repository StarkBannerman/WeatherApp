import {
  Box,
  Grid,
  Typography,
  Avatar,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import robo from "../../assets/robot.svg";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { APP_URL } from "../../constants.js";
import { CircularProgress } from "@mui/material";

export default function ChatWindow(props) {
  const [loading, setLoading] = useState(true);
  const [waitForResponse, setWaitForResponse] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  var chatContainerRef = useRef(null);
  const getResponseFromAI = async () => {
    try {
      console.log("Inside API CALL");
      const response = await axios.post(`${APP_URL}/bot`, {
        question: message,
      });
      response?.data &&
        setChats((prev) => [
          ...prev,
          {
            sender: "bot",
            message: response.data.response,
          },
        ]);
      setMessage("");
      setWaitForResponse(false);
      return response.data.response;
    } catch (error) {
      setMessage("");
      setWaitForResponse(false);
      throw error;
    }
  };
  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      const lastChild = chatContainerRef.current.lastElementChild;
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  const handleClickSend = () => {
    try {
      setWaitForResponse(true);
      setChats((prev) => [
        ...prev,
        {
          sender: "visitor",
          message: message,
        },
      ]);

      getResponseFromAI();
      setCurrentMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setWaitForResponse(true);
      setChats((prev) => [
        ...prev,
        {
          sender: "visitor",
          message: message,
        },
      ]);

      getResponseFromAI();
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [chats]);
  return (
    <Grid
      container
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#110033",
        alignSelf: "center",
        p: 1,
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
        // borderRadius: "25px",
      }}
    >
      {/* Header For Chat */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          height: "10%",
          width: "100%",

          p: 3,
          display: "flex",
          backgroundColor: "#110033",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <img src={robo} height="50px" width="50px" />
        <Box>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "20px",
              color: "#FFF",
              ml: 3,
            }}
          >
            Mistral 7B-instruct
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          height: "70vh",
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
          mt: "15vh",
        }}
      >
        <Grid
          container
          direction="row"
          id="chatConversation"
          ref={chatContainerRef}
          sx={{ pt: 1 }}
        >
          {chats &&
            chats.map((chat, index) => {
              if (chat.sender === "visitor") {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    {chat.message !== "" && (
                      <>
                        {/*  <Box sx={{display:'flex',flexDirection:'column-reverse',ml:1,mr:2}}>
                                                    <Box sx={{background:appConfiguration.color,width:'20px',height:'20px',borderRadius:'50%'}}></Box>
                                                </Box> */}
                        <Box
                          sx={{
                            p: 1.5,
                            mr: 2,
                            color: "#FFFFFF",
                            borderRadius: "25px 25px 0px 25px",
                            border: "1px solid #FFF",
                            minWidth: "35px",
                            maxWidth: "85%",
                            overflowWrap: "break-word",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ fontSize: "13px", display: "block" }}
                            dangerouslySetInnerHTML={{
                              __html: chat.message.replace(/\n/g, "<br>"),
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </Grid>
                );
              }

              if (chat.sender === "bot") {
                return (
                  <>
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: 1,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column-reverse",
                          mr: 1,
                          ml: 2,
                        }}
                      >
                        <Avatar
                          src={robo}
                          sx={{
                            borderRadius: "50%",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          p: 1.5,
                          color: "#FFF",
                          borderRadius: "25px 25px 25px 0px",
                          //background: "#FFFFFF",
                          width: "fit-content",
                          maxWidth: "70%",
                          overflowWrap: "break-word",
                          alignItems: "center",
                          border: `1px solid #FFF`,
                        }}
                      >
                        <ReactMarkdown>{chat.message}</ReactMarkdown>
                      </Box>
                    </Grid>
                  </>
                );
              }
            })}
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <form onSubmit={getResponseFromAI}>
          {waitForResponse ? (
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Bars
                height="50"
                width="30"
                color={"green"}
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </Box>
          ) : (
            <FormControl fullWidth>
              <OutlinedInput
                sx={{
                  borderRadius: "16px",
                  height: "50px",
                  pl: 2,
                  pr: 4,
                  color: "#FFF",
                  border: "1px solid #FFF",
                }}
                multiline
                maxRows={1}
                onKeyDown={handleKeyDown}
                value={currentMessage}
                required
                placeholder="Type & Press Enter"
                onChange={(e) => {
                  setMessage(e.target.value);
                  setCurrentMessage(e.target.value);
                }}
                //value={query}
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <div onClick={handleClickSend}>
                      <IconButton type="submit" edge="end">
                        {loading ? (
                          <SendRoundedIcon
                            sx={{
                              width: "25px",
                              height: "25px",
                              color: "#FFF",
                            }}
                          />
                        ) : (
                          <CircularProgress variant="indeterminate" size={25} />
                        )}
                      </IconButton>
                    </div>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        </form>
      </Grid>
    </Grid>
  );
}
