import {
  FormEvent,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';
import axios from 'axios';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState, UserLogout, UserModify } from 'index';
import { FiChevronsUp } from 'react-icons/fi';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import userHolder from '../../Image/Logo/welcome.svg';
import oauthImg from '../../Image/Logo/3people.svg';
import {
  Wrapper,
  FooterWrapper,
  LeftBox,
  UserPhoto,
  ImgForm,
  ImgInput,
  ImgLabel,
  StackBox,
  StackName,
  StackText,
  StackLine,
  CostBox,
  CostText,
  CostInput,
  RightBox,
  InfoBox,
  InfoNameForm,
  InfoPasswordForm,
  InfoText,
  NameText,
  PasswordText,
  InfoDistrict,
  EmailInput,
  InfoInput,
  InfoNameBtn,
  InfoPwBtn,
  InfoErrorText,
  InfoModalBack,
  InfoModalBox,
  InfoModalText,
  InfoModalBtn,
  ChangeModalBack,
  ChangeModalBox,
  ChangeModalText,
  ChangeModalBtn,
  WitText,
  WitInfo,
  WitModalBack,
  WitModalBox,
  WitModalBtnBox,
  WitModalBtn,
  CommonBox,
  OauthHolder,
  UpScrollBtn,
} from './styles';

const Payment = loadable(() => import('Components/Payment'));
const Button = loadable(() => import('Components/Button'));

function Profile() {
  const [witModalView, setWitModalView] = useState(false);
  const [infoModalView, setInfoModalView] = useState(false);
  const [changeModalView, setChangeModalView] = useState(false);
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [js, setJs] = useState(userInfo.stacks?.[0]);
  const [ts, setTs] = useState(userInfo.stacks?.[1]);
  const [css, setCss] = useState(userInfo.stacks?.[2]);
  const [react, setReact] = useState(userInfo.stacks?.[3]);
  const [vue, setVue] = useState(userInfo.stacks?.[4]);
  const [noSql, setNoSql] = useState(userInfo.stacks?.[5]);
  const [sql, setSql] = useState(userInfo.stacks?.[6]);
  const [express, setExpress] = useState(userInfo.stacks?.[7]);
  const [aws, setAws] = useState(userInfo.stacks?.[8]);
  const [other, setOther] = useState(userInfo.stacks?.[9]);
  const [username, setUsername] = useState(userInfo.username);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [errNameMessage, setErrNameMessage] = useState('');
  const [errPwMessage, setErrPwMessage] = useState('');
  const [errConfirmPwMessage, setErrConfirmPwMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (username === '') {
      setErrNameMessage('');
    }
    if (password === '') {
      setErrPwMessage('');
    }
    if (password.length > 0 && password.length < 4) {
      setErrPwMessage('?????? 4?????? ?????? ???????????????.');
    }
    if (password.length >= 4) {
      setErrPwMessage('');
    }
    if (confirmPw === '') {
      setErrConfirmPwMessage('');
    }
    if (confirmPw === password) {
      setErrConfirmPwMessage('');
    }
    if (confirmPw !== password) {
      setErrConfirmPwMessage('??????????????? ???????????? ????????????.');
    }
  }, [username, password, confirmPw]);

  const usernameOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
    },
    [setUsername],
  );

  const passwordOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword],
  );

  const confirmPwOnChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setConfirmPw(e.currentTarget.value);
    },
    [setConfirmPw],
  );

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const UpScrollOnClick = () => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  const onClickJs = useCallback(async () => {
    setJs(!js);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/0`,
      { js, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [js, setJs]);

  const onClickTs = useCallback(async () => {
    setTs(!ts);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/1`,
      { ts, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [ts, setTs]);

  const onClickCss = useCallback(async () => {
    setCss(!css);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/2`,
      { css, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [css, setCss]);

  const onClickReact = useCallback(async () => {
    setReact(!react);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/3`,
      { react, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [react, setReact]);

  const onClickVue = useCallback(async () => {
    setVue(!vue);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/4`,
      { vue, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [vue, setVue]);

  const onClickNoSql = useCallback(async () => {
    setNoSql(!noSql);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/5`,
      { noSql, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [noSql, setNoSql]);

  const onClickSql = useCallback(async () => {
    setSql(!sql);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/6`,
      { sql, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [sql, setSql]);

  const onClickExpress = useCallback(async () => {
    setExpress(!express);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/7`,
      { express, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [express, setExpress]);

  const onClickAws = useCallback(async () => {
    setAws(!aws);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/8`,
      { aws, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [aws, setAws]);

  const onClickOther = useCallback(async () => {
    setOther(!other);
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/stacks/9`,
      { other, id: userInfo.id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    dispatch(UserModify(data.data.data));
  }, [other, setOther]);

  const handleInfoModalClick = useCallback(() => {
    setInfoModalView(!infoModalView);
  }, [infoModalView, setInfoModalView]);

  const handlePwModalClick = useCallback(() => {
    setChangeModalView(!changeModalView);
    navigate('/');
  }, [changeModalView, setChangeModalView, navigate]);

  const handleWitModalClick = useCallback(() => {
    setWitModalView(!witModalView);
  }, [witModalView, setWitModalView]);

  const handleWitDelClick = useCallback(async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER}/users/signout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    dispatch(UserLogout());
    navigate('/');
    setWitModalView(!witModalView);
  }, [witModalView, setWitModalView, navigate]);

  const handleNameSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (username !== userInfo.username) {
        setUsername(username);
        const data = await axios.patch(
          `${process.env.REACT_APP_SERVER}/users/profile`,
          { id: userInfo.id, newUsername: username },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        dispatch(UserModify(data.data.data));
        setUsername(username);
        setErrNameMessage('');
        setInfoModalView(!infoModalView);
      }
    },
    [
      username,
      setUsername,
      setErrNameMessage,
      infoModalView,
      setInfoModalView,
      dispatch,
    ],
  );

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPw && password !== '') {
      await axios.patch(
        `${process.env.REACT_APP_SERVER}/users/profile`,
        { id: userInfo.id, newPassword: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      dispatch(UserLogout());
      setChangeModalView(!changeModalView);
    }
  };

  const checkUernameOnClick = useCallback(async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/users/verify/username`,
        { username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setErrNameMessage('???????????? ???????????? ??? ????????????.');
    } catch {
      setErrNameMessage('?????? ????????? ???????????? ???????????????.');
    }
  }, [username, setUsername]);

  const [cost, setCost] = useState(0);

  const costOnChange = useCallback(
    (e: any) => {
      setCost(e.target.value);
    },
    [cost, setCost],
  );

  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadImg = e.target.files[0];
      const formData = new FormData();
      formData.append('image', uploadImg);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/upload/${userInfo.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      dispatch(UserModify(data.data.data));
    }
  };

  return (
    <>
      <Nav />
      <Wrapper>
        <LeftBox>
          {userInfo?.imgUrl ? (
            <UserPhoto src={userInfo.imgUrl} />
          ) : (
            <UserPhoto src={userHolder} />
          )}
          <ImgForm>
            <ImgLabel htmlFor="imgInput">????????? ?????? ??????</ImgLabel>
            <ImgInput
              id="imgInput"
              type="file"
              accept="image/*"
              onChange={onChangeImg}
            />
          </ImgForm>
          <StackName>???????????????, {userInfo.username}???!</StackName>
          <StackText>?????? ???????????? ??????</StackText>
          <StackLine />
          <StackBox>
            {js ? (
              <Button
                onClick={onClickJs}
                bg="#5A9E7A"
                cl="white"
                name="Javascript"
              />
            ) : (
              <Button
                onClick={onClickJs}
                bg="white"
                cl="#5A9E7A"
                name="Javascript"
              />
            )}
            {ts ? (
              <Button
                onClick={onClickTs}
                bg="#5A9E7A"
                cl="white"
                name="Typescript"
              />
            ) : (
              <Button
                onClick={onClickTs}
                bg="white"
                cl="#5A9E7A"
                name="Typescript"
              />
            )}
            {css ? (
              <Button onClick={onClickCss} bg="#5A9E7A" cl="white" name="CSS" />
            ) : (
              <Button onClick={onClickCss} bg="white" cl="#5A9E7A" name="CSS" />
            )}
            {react ? (
              <Button
                onClick={onClickReact}
                bg="#5A9E7A"
                cl="white"
                name="React"
              />
            ) : (
              <Button
                onClick={onClickReact}
                bg="white"
                cl="#5A9E7A"
                name="React"
              />
            )}
            {vue ? (
              <Button onClick={onClickVue} bg="#5A9E7A" cl="white" name="Vue" />
            ) : (
              <Button onClick={onClickVue} bg="white" cl="#5A9E7A" name="Vue" />
            )}
            {noSql ? (
              <Button
                onClick={onClickNoSql}
                bg="#5A9E7A"
                cl="white"
                name="NoSql"
              />
            ) : (
              <Button
                onClick={onClickNoSql}
                bg="white"
                cl="#5A9E7A"
                name="NoSql"
              />
            )}
            {sql ? (
              <Button onClick={onClickSql} bg="#5A9E7A" cl="white" name="SQL" />
            ) : (
              <Button onClick={onClickSql} bg="white" cl="#5A9E7A" name="SQL" />
            )}
            {express ? (
              <Button
                onClick={onClickExpress}
                bg="#5A9E7A"
                cl="white"
                name="Express"
              />
            ) : (
              <Button
                onClick={onClickExpress}
                bg="white"
                cl="#5A9E7A"
                name="Express"
              />
            )}
            {aws ? (
              <Button onClick={onClickAws} bg="#5A9E7A" cl="white" name="AWS" />
            ) : (
              <Button onClick={onClickAws} bg="white" cl="#5A9E7A" name="AWS" />
            )}
            {other ? (
              <Button
                onClick={onClickOther}
                bg="#5A9E7A"
                cl="white"
                name="Others"
              />
            ) : (
              <Button
                onClick={onClickOther}
                bg="white"
                cl="#5A9E7A"
                name="Others"
              />
            )}
          </StackBox>
          <StackText>??? ?????? ??????</StackText>
          <StackLine />
          <CostBox>
            <CostText>????????? ??????</CostText>
            <CostText>{userInfo.money}???</CostText>
            <CostInput
              placeholder="????????? ??????"
              type="text"
              onChange={costOnChange}
            />
            <Payment cost={cost} setCost={setCost} />
          </CostBox>
        </LeftBox>
        <RightBox>
          <InfoBox>
            <InfoNameForm onSubmit={handleNameSubmit}>
              <InfoText>?????????</InfoText>
              <EmailInput value={userInfo.email} readOnly />
              <NameText>?????????</NameText>
              <InfoDistrict onClick={checkUernameOnClick}>
                ????????????
              </InfoDistrict>
              <InfoInput
                type="text"
                maxLength={16}
                value={username}
                placeholder={username}
                onChange={usernameOnChange}
              />
              <InfoErrorText>{errNameMessage}</InfoErrorText>
              <InfoNameBtn type="submit">????????? ????????????</InfoNameBtn>
            </InfoNameForm>
            {userInfo.oauth ? (
              <CommonBox>
                <OauthHolder src={oauthImg} />
              </CommonBox>
            ) : (
              <InfoPasswordForm onSubmit={handlePasswordSubmit}>
                <PasswordText>????????????</PasswordText>
                <InfoInput
                  type="password"
                  placeholder="??????????????? ???????????????"
                  onChange={passwordOnChange}
                />
                <InfoErrorText>{errPwMessage}</InfoErrorText>
                <InfoInput
                  type="password"
                  placeholder="??????????????? ?????? ??? ???????????????"
                  onChange={confirmPwOnChange}
                />
                <InfoErrorText>{errConfirmPwMessage}</InfoErrorText>
                <InfoPwBtn type="submit">???????????? ????????????</InfoPwBtn>
                <WitInfo onClick={handleWitModalClick}>????????????</WitInfo>
              </InfoPasswordForm>
            )}
          </InfoBox>
        </RightBox>
        {witModalView ? (
          <WitModalBack>
            <WitModalBox>
              <WitText>????????? ???????????? ??????????</WitText>
              <WitModalBtnBox>
                <WitModalBtn onClick={handleWitDelClick}>???</WitModalBtn>
                <WitModalBtn onClick={handleWitModalClick}>?????????</WitModalBtn>
              </WitModalBtnBox>
            </WitModalBox>
          </WitModalBack>
        ) : null}
        {infoModalView ? (
          <InfoModalBack>
            <InfoModalBox>
              <InfoModalText>???????????? ?????????????????????</InfoModalText>
              <InfoModalBtn onClick={handleInfoModalClick}>??????</InfoModalBtn>
            </InfoModalBox>
          </InfoModalBack>
        ) : null}
        {changeModalView ? (
          <ChangeModalBack>
            <ChangeModalBox>
              <ChangeModalText>
                ???????????? ????????? ?????????????????? ?????? ????????? ????????????
              </ChangeModalText>
              <ChangeModalBtn onClick={handlePwModalClick}>??????</ChangeModalBtn>
            </ChangeModalBox>
          </ChangeModalBack>
        ) : null}
      </Wrapper>
      {scrollY > 500 ? (
        <UpScrollBtn>
          <FiChevronsUp
            className="upscroll"
            type="button"
            onClick={UpScrollOnClick}
          >
            ????????????
          </FiChevronsUp>
        </UpScrollBtn>
      ) : null}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Profile;
