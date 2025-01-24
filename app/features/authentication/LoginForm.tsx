import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Replace with react-navigation if not using expo-router
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; // Adjust path if necessary


const LoginForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleNavigate = () => {
    navigation.navigate('Home');
  };
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      Alert.alert('Login successful!', `Welcome ${data.email}`);
      navigation.navigate('Home'); // Uncomment for navigation
    } catch (error) {
      Alert.alert('Login failed', 'Invalid email or password, please try again!');
    }
  };

  const onForgotPassword = (email: string) => {
    Alert.alert('Password Reset', `Password reset link sent to ${email}`);
    //router.push('/forgot-password'); // Navigate to forgot-password screen
  };
  const onRegister = () => {
    navigation.navigate('Register'); 
    //router.push('/forgot-password'); // Navigate to forgot-password screen
  };


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Login</Text>
      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          color="#e99faa"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Home"
          onPress={handleNavigate}
          //disabled={isSubmitting}
          color="#e99faa"
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => onRegister()}>
            <Text style={styles.forgotPasswordText}>Dont have account?Creat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => onForgotPassword('user@example.com')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default LoginForm;

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#a41212',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 300,
    fontSize: 16,
    color: '#333',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: 300,
  },
  forgotPasswordText: {
    color: '#FF8A65',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
  },
});
