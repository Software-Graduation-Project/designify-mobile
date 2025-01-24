import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

interface CardWritingProps {
  cardId: string;
  onSaveMessage: (cardId: string, message: string) => void;
}

const CardWriting: React.FC<CardWritingProps> = ({ cardId, onSaveMessage }) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [output, setOutput] = useState("");

  const generatePlaceholderText = () => {
    if (!customPrompt.trim() || !senderName.trim() || !recipientName.trim()) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    const generatedMessage = `From: ${senderName}\nTo: ${recipientName}\n\n${customPrompt}`;
    setOutput(generatedMessage);
  };

  const saveMessage = () => {
    let message = customPrompt;
  
    if (!useAI) {
      if (!customPrompt.trim() || !senderName.trim() || !recipientName.trim()) {
        Alert.alert("Missing Fields", "Please fill in all fields.");
        return;
      }
      message = `From: ${senderName}\nTo: ${recipientName}\n\n${customPrompt}`;
    } else if (!message.trim()) {
      Alert.alert("Empty Message", "Please write a message before saving.");
      return;
    }
  
    onSaveMessage(cardId, message);
    Alert.alert("Message Saved", "Your message has been saved successfully.");
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Card Writing</Text>

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[
            styles.radioOption,
            !useAI && styles.selectedOption, // Highlight when not AI
          ]}
          onPress={() => setUseAI(false)}
        >
          <Image
            source={require("../../../../assets/Icons/pen1.png")}
            style={styles.icon}
          />
          <Text>Hand Writing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioOption,
            useAI && styles.selectedOption, // Highlight when AI
          ]}
          onPress={() => setUseAI(true)}
        >
          <Image
            source={require("../../../../assets/Icons/AI1.png")}
            style={styles.icon}
          />
          <Text>AI Writing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Sender"
          value={senderName}
          onChangeText={setSenderName}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipientName}
          onChangeText={setRecipientName}
        />
      </View>

      {useAI ? (
        <View>
          <TextInput
            style={styles.textarea}
            placeholder="Write what you want the AI to include in the card..."
            value={customPrompt}
            onChangeText={setCustomPrompt}
            multiline
          />
          {output ? (
            <View style={styles.outputContainer}>
              <Text style={styles.outputTitle}>Generated Message:</Text>
              <Text style={styles.outputText}>{output}</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.customButton} onPress={generatePlaceholderText}>
            <Text style={styles.buttonText}>Generate AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={saveMessage}>
            <Text style={styles.buttonText}>Save Message</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.textarea}
          placeholder="Write the message for the card by hand..."
          value={customPrompt}
          onChangeText={setCustomPrompt}
          multiline
        />
      )}

      {!useAI && (
        <TouchableOpacity style={styles.customButton} onPress={saveMessage}>
          <Text style={styles.buttonText}>Save Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#D77F8F",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioOption: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#eec8cf",
    backgroundColor: "#f9ecf1e9",
  },
  icon: {
    width: 70,
    height: 50,
    borderRadius: 15,
    marginBottom: 5,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  outputContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  outputTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  outputText: {
    fontSize: 16,
  },
  customButton: {
    backgroundColor: "#9ba1e6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardWriting;
