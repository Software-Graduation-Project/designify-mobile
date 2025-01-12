import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const sendEmail = () => {
    if (!formData.user_name || !formData.user_email || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      message: formData.message,
    };

    emailjs
      .send('service_7o4fzgn', 'template_ae4fji9', templateParams, '3utpEi5L2w2bw-lZn')
      .then(
        () => {
          Alert.alert('Success', 'Email sent successfully!');
          setFormData({ user_name: '', user_email: '', message: '' });
        },
        (error) => {
          Alert.alert('Error', `Failed to send email: ${error.text}`);
        }
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.user_name}
        onChangeText={(text) => setFormData({ ...formData, user_name: text })}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.user_email}
        onChangeText={(text) => setFormData({ ...formData, user_email: text })}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
     

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.textarea}
        value={formData.message}
        onChangeText={(text) => setFormData({ ...formData, message: text })}
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
      />
       <View style={styles.buttonContainer}>
        <Button title="Send" onPress={sendEmail} color="pink" />
      </View>
      
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Ensures text starts from the top in multiline input
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
