import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { GiftedChat, IMessage, Bubble, InputToolbar } from "react-native-gifted-chat";
import { db } from "../firebase/firebase";

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const receiver = {
    name: "Help Center",//"Sweet Touches"
    description:"What can we help you with",//"Chat with Sweet Touches"
    photoUrl: require("../../assets/Icons/3d-setting.png"), //sweet.jpg Replace with the receiver's image URL
  };

  useEffect(() => {
    const messagesRef = db.ref("messages");

    // Listen for new messages
    const handleChildAdded = (snapshot: any) => {
      const newMessage = snapshot.val();
      if (newMessage) {
        setMessages((prevMessages) => {
          // Prevent duplicates by checking if the message ID already exists
          const alreadyExists = prevMessages.some((msg) => msg._id === newMessage._id);
          if (alreadyExists) {
            return prevMessages;
          }
          return GiftedChat.append(prevMessages, [
            {
              _id: newMessage._id,
              text: newMessage.text,
              createdAt: new Date(newMessage.createdAt),
              user: newMessage.user,
            },
          ]);
        });
      }
    };

    messagesRef.on("child_added", handleChildAdded);

    // Cleanup listener on unmount
    return () => messagesRef.off("child_added", handleChildAdded);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const messagesRef = db.ref("messages");

    // Add new messages to Firebase
    newMessages.forEach((message) => {
      const newMessageRef = messagesRef.push();
      newMessageRef.set({
        _id: newMessageRef.key, // Use Firebase's unique key as the message ID
        text: message.text,
        createdAt: new Date(message.createdAt).toISOString(),
        user: message.user,
      });
    });
  }, []);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#D77F8F" },
        left: { backgroundColor: "#ECECEC" },
      }}
      textStyle={{
        right: { color: "#FFF" },
        left: { color: "#000" },
      }}
    />
  );

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#F5F5F5",
        borderTopWidth: 1,
        borderTopColor: "#DDD",
      }}
    />
  );

  const renderMessageText = (props: any) => {
    const { currentMessage } = props;
    return (
      <View style={{ margin: 5 }}>
        <Text
          style={[
            styles.messageText,
            currentMessage?.user._id === "1" ? styles.sentText : styles.receivedText,
          ]}
        >
          {currentMessage?.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={receiver.photoUrl} style={styles.avatar} />
        <Text style={styles.receiverName}>{receiver.name}</Text>
        <Text style={styles.receiverdescription}>{receiver.description}</Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: "1", name: "Anonymous" }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderMessageText={renderMessageText}
        placeholder="Type a message..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 70,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "#EEE",
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 54, // Makes the image circular
    marginBottom: 10,
  },
  receiverName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: "#FFF",
  },
  receivedText: {
    color: "#000",
  },
    receiverdescription:{
        fontSize: 15,
        color: "#333",
    }
});

export default ChatScreen;
