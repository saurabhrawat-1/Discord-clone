import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelName, selectChannelId } from "../features/appSlice";
import db from "../firebase";
import firebase from "firebase";

//Material UI imports
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  // console.log(user);
  // console.log(channelId);
  // console.log(channelName);

  //
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message?.timestamp}
            message={message?.message}
            user={message?.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            placeholder={`Message #${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
