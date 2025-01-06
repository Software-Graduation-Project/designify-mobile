import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router'; // Replace with react-navigation if not using expo-router

const LoginForm = () => {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      // Simulate login logic
      Alert.alert('Login successful!', `Welcome ${data.email}`);
      //router.push('/'); // Navigate to the home screen
    } catch (error) {
      Alert.alert('Login failed', 'Invalid email or password, please try again!');
    }
  };

  const onForgotPassword = (email: string) => {
    Alert.alert('Password Reset', `Password reset link sent to ${email}`);
    router.push('/forgot-password'); // Navigate to forgot-password screen
  };

  return (
    <MainContainer>
      <WelcomeText>Login</WelcomeText>
      <View>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <StyledInput
              placeholder="Email"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <StyledForgotPasswordContainer>
          <TouchableOpacity onPress={() => onForgotPassword('user@example.com')}>
            <ForgotPasswordText>Forgot your password?</ForgotPasswordText>
          </TouchableOpacity>
        </StyledForgotPasswordContainer>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <StyledInput
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <ButtonContainer>
        <StyledButton
          title="Login"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

export default LoginForm;

// Styled Components
const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadowOpacity: 0.1;
  shadow-radius: 10px;
`;

const StyledInput = styled.TextInput`
  background: #f0f4ff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 300px;
`;

const StyledButton = styled(Button)`
  background:  rgb(245, 213, 241);
  padding: 10px;
  margin-top: 10px;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledForgotPasswordContainer = styled.View`
  align-items: flex-end;
`;

const ForgotPasswordText = styled.Text`
  color: #ff8a65;
  text-decoration: underline;
  font-size: 14px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;
