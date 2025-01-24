import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; // Adjust the path as needed

const RegisterForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Simulate a successful registration
    Alert.alert('Registration Successful!', `Welcome, ${data.firstName}!`);
    navigation.navigate('Home'); // Navigate to Login screen
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Register</Text>
      <View style={styles.inputContainer}>
        {(['username', 'email', 'password', 'confirmPassword', 'firstName', 'lastName', 'phoneNumber'] as const).map((field, index) => (
          <Controller
            key={index}
            name={field}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={field
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}
                secureTextEntry={field.toLowerCase().includes('password')}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e87d8c',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f3f7ff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 300,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#e87d8c',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 15,
    color: '#e87d8c',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
