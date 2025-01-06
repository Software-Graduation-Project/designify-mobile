import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import LoginForm from '../../features/authentication/LoginForm'; // Adjust the path as needed
import styled from 'styled-components/native';

const LoginPage = () => {
  return (
    <PageContainer>
      {/* Lottie Animation as Background */}
      <AnimatedBackground>
        <LottieView
          source={{ uri: 'https://lottie.host/1a8e801a-e220-49bf-9e42-a2a0c0a6dd3f/hwIuP7H4Bi.lottie' }}
          autoPlay
          loop
          style={styles.lottie}
        />
      </AnimatedBackground>
      {/* Centered Login Form */}
      <CenteredContainer>
        <LoginContainer>
          <LoginForm />
        </LoginContainer>
      </CenteredContainer>
    </PageContainer>
  );
};

export default LoginPage;

// Styled Components
const PageContainer = styled.View`
  flex: 1;
  position: relative;
`;

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.View`
  margin-right: 50px;

  @media (max-width: 1024px) {
    margin: 0 auto;
    width: 70%;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 90%;
    text-align: center;
  }
`;

const AnimatedBackground = styled.View`
  position: absolute;
  top: -270px;
  left: 0;
  right: 0;
  

  @media (max-width: 768px) {
    display: none;
  }
`;

const styles = StyleSheet.create({
  lottie: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
