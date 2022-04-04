import styled from 'styled-components';
import loadable from '@loadable/component';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'index';
import { UserLogin } from '../index';
import kakao from '../Image/Btn/kakao.png';
import google from '../Image/Btn/google.png';
import naver from '../Image/Btn/naver.png';

const Home = loadable(() => import('Routes/Home'));

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media ${(props) => props.theme.mobile} {
    top: 20px;
  }
`;
const Wrapper = styled.div`
  width: 370px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 30px;
  padding: 70px 35px;
  position: relative;
  top: 50px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const EmailInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 250px;
  }
`;
const PasswordInput = styled.input`
  width: 315px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: normal;
  color: ${(props) => props.theme.lightGrey};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 250px;
  }
`;
const ExitBtn = styled.button`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: inherit;
  border: none;
  position: absolute;
  top: 15px;
  right: 25px;
  cursor: pointer;
`;
const LoginBtn = styled.button`
  width: 240px;
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 7px 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.lightGrey};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 180px;
  }
`;
const SignupBtn = styled.div`
  width: 220px;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  text-align: center;
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: ${(props) => props.theme.lightGrey};
    color: ${(props) => props.theme.white};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 160px;
  }
`;

const Naver = styled.a`
  width: 225px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-image: url(${naver});
  background-position: center;
  background-size: cover;
  margin-bottom: 3px;
  cursor: pointer;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 190px;
    height: 45px;
  }
`;

const Kaoko = styled(Naver)`
  background-image: url(${kakao});
  @media ${(props) => props.theme.iPhone12Pro} {
    margin-bottom: 0px;
    height: 44px;
  }
`;

const Google = styled(Naver)`
  background-image: url(${google});
  width: 230px;
  border-radius: 10px;
  margin-bottom: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    background-size: 195px 50px;
    width: 195px;
    height: 50px;
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.lightGrey};
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-bottom: 15px;
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, isOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (email && password) {
          const data = await axios.post(
            `${process.env.REACT_APP_SERVER}/users/login`,
            { email, password },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );
          dispatch(UserLogin(data.data.data));
          setEmail('');
          setPassword('');
          navigate('/');
        }
      } catch (err) {
        setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
      }
    },
    [email, password, setEmail, setPassword, navigate, setErrorMessage],
  );

  const emailOnChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail],
  );

  const passwordOnChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword],
  );

  const exitOnClick = useCallback(() => {
    isOpen(false);
    navigate('/');
  }, [open, isOpen, navigate]);

  const signUpOnClick = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const state = window.localStorage.getItem('com.naver.nid.oauth.state_token');
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${state}&redirect_uri=${process.env.REACT_APP_NAVER_CALLBACK_URL}`;
  const kakaoUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
  const googleUrl = process.env.REACT_APP_GOOGLE_AUTH_URL;

  return (
    <>
      {open ? (
        <LoginWrapper>
          <Wrapper>
            <ExitBtn onClick={exitOnClick}>X</ExitBtn>
            <Form onSubmit={handleOnSubmit}>
              <EmailInput
                value={email}
                required
                onChange={emailOnChange}
                placeholder="이메일을 입력해주세요"
              />
              <PasswordInput
                value={password}
                required
                type="password"
                onChange={passwordOnChange}
                placeholder="비밀번호을 입력해주세요"
              />
              <Text>{errorMessage || null}</Text>
              <LoginBtn type="submit">로그인</LoginBtn>
            </Form>
            <Text>------------------------ 또는 -----------------------</Text>
            <Naver href={naverUrl} />
            <Kaoko href={kakaoUrl} />
            <Google href={googleUrl} />
            <Text>--------------- 아직 회원이 아니시라면? --------------</Text>
            <SignupBtn onClick={signUpOnClick}>회원가입</SignupBtn>
          </Wrapper>
        </LoginWrapper>
      ) : null}
      <Home />
    </>
  );
}

export default Login;
