import { Fade } from 'react-awesome-reveal';
import { FaSearch } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { FiChevronsUp } from 'react-icons/fi';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { HomeSearch } from 'index';
import Nav from 'Components/Nav';
import Footer from '../../Components/Footer';
import logo1 from '../../Image/Logo/1.svg';
import logo2 from '../../Image/Logo/2.svg';
import logo3 from '../../Image/Logo/3.svg';
import logo4 from '../../Image/Logo/4.svg';
import logo5 from '../../Image/Logo/5.svg';
import intro from '../../Image/intro.gif';
import {
  DeleteBtn,
  Form,
  HomeWrapper,
  Logo,
  Searchbar,
  SearchBarBox,
  SearchBarWrapper,
  SearchBox,
  SearchInput,
  Text,
  Wrapper,
  Button,
  Box,
  LeftBox,
  TextBox,
  Number,
  Title,
  Descriprtion,
  RightBox,
  UpScrollBtn,
  FooterWrapper,
  IntroWrapper,
  Intro,
} from './styles';

const SearchList = loadable(() => import('Components/SearchList'));

interface IElProps {
  id: string;
  title: string;
  tag: string[];
}

function Home() {
  const [value, setValue] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState([]);
  const [homeSearch, setHomeSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const getTitle = useCallback(async () => {
    const postTitle = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/title`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      },
    );
    const title = postTitle.data.data.map((el: IElProps) => el.title);
    setTitle(title);
  }, [title, setTitle]);

  const handleFollow = useCallback(() => {
    setScrollY(window.pageYOffset); // window ????????? ?????? ScrollY??? ??????
  }, [setScrollY]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); // addEventListener ????????? ??????
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener ????????? ??????
    };
  });

  useEffect(() => {
    setHomeSearch(false);
    getTitle();
  }, []);

  useEffect(() => {
    if (homeSearch) {
      const getSeach = async () => {
        const data = await axios.post(
          `${process.env.REACT_APP_SERVER}/posts/search?keyword=${value}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        dispatch(HomeSearch(data.data.data));
      };
      getSeach();
      navigate(`/search?keyword=${value}`);
    }
  }, [homeSearch, value]);

  const arr = title.filter((el: string) => {
    return el.toLowerCase().includes(value.toLowerCase());
  });

  const filteredArr: string[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (filteredArr.length >= 10) {
      break;
    }
    const isIn = filteredArr.includes(arr[i]);
    if (!isIn) {
      filteredArr.push(arr[i]);
    }
  }

  const searchListOnClick = async (e: React.SyntheticEvent<EventTarget>) => {
    setValue((e.target as HTMLInputElement).innerText);
    setHomeSearch(true);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/search?keyword=${value}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(HomeSearch(data.data.data));
    setErrorMessage('????????? ??????????????????!');
    navigate(`/search?keyword=${value}`);
  };

  const deleteValueOnClick = useCallback(() => {
    setValue('');
  }, [setValue]);

  const UpScrollOnClick = useCallback(() => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Nav />
      <HomeWrapper>
        <Wrapper>
          <Fade delay={400}>
            <IntroWrapper>
              <Intro src={intro} alt={logo1} />
            </IntroWrapper>
            {/* <Logo src={logo1} /> */}
          </Fade>
          <SearchBox>
            <Fade delay={500}>
              <Text>??????????????? ???????????? ??????</Text>
              <Text>?????? ??????????????????!</Text>
              <HiOutlineChevronDoubleDown className="down" />
            </Fade>
            <Fade delay={600}>
              <Searchbar>
                <Form onSubmit={handleOnSubmit}>
                  <SearchBarWrapper>
                    <SearchInput
                      onChange={handleOnChange}
                      value={value}
                      placeholder={errorMessage || '????????? ??????????????????!'}
                    />

                    <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>

                    {arr.length !== 0 && value !== '' ? (
                      <SearchBarBox>
                        <SearchList
                          type="button"
                          list={filteredArr}
                          chooseList={searchListOnClick}
                        />
                      </SearchBarBox>
                    ) : null}
                  </SearchBarWrapper>
                  <Button type="submit">
                    <FaSearch className="search" />
                  </Button>
                </Form>
              </Searchbar>
            </Fade>
          </SearchBox>
        </Wrapper>
        <Box>
          <LeftBox>
            <Fade delay={500}>
              <Logo src={logo2} />
            </Fade>
            <Fade delay={500}>
              <TextBox>
                <Number>01</Number>
                <Title>??????????????? ?????? ????????? ????????????????</Title>
                <Fade delay={700}>
                  <Descriprtion>
                    ????????? ?????? ????????? ???????????? ??????????????????.
                  </Descriprtion>
                  <Descriprtion>
                    ????????? ????????? ??????????????? ??????????????? ???????????? ????????????.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
          </LeftBox>
        </Box>
        <Box>
          <RightBox>
            <Fade delay={500}>
              <TextBox>
                <Number>02</Number>
                <Title>??????????????? ????????? ????????????????</Title>
                <Fade delay={700}>
                  <Descriprtion>
                    ????????? ????????? ????????? ????????? ????????? ??????????????????.
                  </Descriprtion>
                  <Descriprtion>
                    ??????????????? ??????????????? ??????????????? ???????????? ????????????.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
            <Fade delay={500}>
              <Logo src={logo3} />
            </Fade>
          </RightBox>
        </Box>
        <Box>
          <LeftBox>
            <Fade delay={500}>
              <Logo src={logo4} />
            </Fade>
            <Fade delay={500}>
              <TextBox>
                <Number className="three">03</Number>
                <Title className="three">??????????????? ????????? ????????????????</Title>
                <Fade delay={700}>
                  <Descriprtion className="three">
                    ???????????? ?????? ????????? ??????????????????.
                  </Descriprtion>
                  <Descriprtion className="three">
                    ????????? ????????? ????????? ??????????????? ??????????????? ????????????
                    ????????????.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
          </LeftBox>
        </Box>
        <Box>
          <RightBox>
            <Fade delay={500}>
              <TextBox>
                <Number className="four">04</Number>
                <Title className="four">?????? ??? ????????? ????????????????</Title>
                <Fade delay={700}>
                  <Descriprtion className="four">
                    ???????????? ?????? ????????? ??????????????????.
                  </Descriprtion>
                  <Descriprtion className="four">
                    ????????? ????????? ????????? ??? ??????????????? ??????????????? ????????????
                    ????????????.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
            <Fade delay={500}>
              <Logo className="logo5" src={logo5} />
            </Fade>
          </RightBox>
        </Box>
      </HomeWrapper>
      {scrollY >= 500 ? (
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

export default Home;
