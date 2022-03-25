import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronsUp } from 'react-icons/fi';
import { AppDispatch, inSearch, RootState } from 'index';
import SearchList from 'Components/SearchList';
import AddBtn from '../Image/Search/add.png';

interface IStackProps {
  bgColor: string;
  color: string;
}

const StackWrapper = styled.div`
  width: 70%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const DownBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Stack = styled.div<IStackProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  padding: 10px;
  margin: 0px 5px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  cursor: pointer;
`;

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;
const SearchInput = styled.input`
  width: 700px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px 10px 10px 15px;
  margin-right: 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  position: absolute;
  top: 12px;
  right: 35px;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const Lists = styled.ul`
  width: 60vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
  place-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const List = styled.li`
  width: 250px;
  height: 250px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  cursor: pointer;
`;

const UpSide = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DownSide = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;
const Tag = styled.div`
  width: 70px;
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  padding: 3px 4px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  margin: 5px;
`;

const SearchBarBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 5px 10px 15px;
  width: 700px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.beige};
  position: absolute;
  top: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
`;

const AddPostBtn = styled.img`
  width: 90px;
  height: 90px;
  position: fixed;
  right: 160px;
  bottom: 700px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
  }
`;

const UpScrollBtn = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 160px;
  bottom: 170px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  .upscroll {
    width: 100%;
    height: 100%;
  }
`;

function Search() {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [html, setHtml] = useState(false);
  const [js, setJs] = useState(false);
  const [css, setCss] = useState(false);
  const [react, setReact] = useState(false);
  const [redux, setRedux] = useState(false);
  const [ts, setTs] = useState(false);
  const [sc, setSc] = useState(false);
  const [node, setNode] = useState(false);
  const [express, setExpress] = useState(false);
  const [aws, setAws] = useState(false);
  const [git, setGit] = useState(false);
  const [all, setAll] = useState(false);
  const [title, setTitle] = useState([]);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postData } = useSelector((state: RootState) => state);
  const [post, setPost] = useState(postData);

  const getTitle = async () => {
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
    const title = postTitle.data.data.map((el: any) => el.title);
    setTitle(title);
  };

  useEffect(() => {
    getTitle();
  }, []);

  const arr = title.filter((el: string) => {
    return el.toLowerCase().includes(value.toLowerCase());
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setSearch(true);
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
    dispatch(inSearch(data.data.data));
    setPost(postData);
    setSearch(false);
    setErrorMessage('여기에 입력해주세요!');
    navigate(`/search?keyword=${value}`);
  };

  const deleteValueOnClick = () => {
    setValue('');
  };

  const checkOnClick = async (el: string) => {
    const filteredPost = postData.filter((post) => {
      return post.tag.includes(el);
    });

    if (el === 'all') {
      setPost(postData);
    } else {
      setPost(filteredPost);
    }

    if (el === 'html') {
      setHtml(true);
      setAll(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'css') {
      setCss(true);
      setAll(false);
      setHtml(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'javascript') {
      setJs(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'react') {
      setReact(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'redux') {
      setRedux(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'typescript') {
      setTs(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'styledcomponents') {
      setSc(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'node') {
      setNode(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'express') {
      setExpress(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setAws(false);
      setGit(false);
    } else if (el === 'aws') {
      setAws(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setGit(false);
    } else if (el === 'git') {
      setGit(true);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
    } else if (el === 'all') {
      setAll(false);
      setAll(!all);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    }
  };

  const searchListOnClick = async (e: any) => {
    setValue((prev) => {
      // eslint-disable-next-line no-param-reassign
      prev = e.target.innerText;
      return prev;
    });
    setSearch(false);
  };
  const postOnClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const AddPostOnClick = () => {
    navigate('/post');
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

  return (
    <>
      <StackWrapper>
        <UpBox>
          {all ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('all')}
            >
              All
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('all')}
            >
              All
            </Stack>
          )}
          {html ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          )}
          {css ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          )}
          {js ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          )}
          {react ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          )}
          {redux ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          )}
        </UpBox>
        <DownBox>
          {ts ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          )}
          {sc ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          )}
          {node ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          )}
          {express ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          )}
          {aws ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          )}
          {git ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('git')}
            >
              Git
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('git')}
            >
              Git
            </Stack>
          )}
        </DownBox>
      </StackWrapper>
      <Searchbar>
        <Form onSubmit={handleOnSubmit}>
          <SearchBarWrapper>
            <SearchInput
              onChange={handleOnChange}
              value={value}
              placeholder={errorMessage || '여기에 입력해주세요!'}
            />
            <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>
            {arr.length !== 0 && value !== '' && search ? (
              <SearchBarBox>
                <SearchList
                  type="submit"
                  list={arr}
                  chooseList={searchListOnClick}
                  // onKey={handleKeyUp}
                />
              </SearchBarBox>
            ) : null}
          </SearchBarWrapper>
          <Button type="submit">
            <FaSearch className="search" />
          </Button>
        </Form>
      </Searchbar>
      <ListWrapper>
        <Lists>
          {post.map((el) => (
            <List key={nanoid()} onClick={() => postOnClick(el.id)}>
              <UpSide>
                <Title>{el.title}</Title>
              </UpSide>
              <DownSide>
                {el.tag.map((el: string) => (
                  <Tag key={nanoid()}>{el}</Tag>
                ))}
              </DownSide>
            </List>
          ))}
        </Lists>
      </ListWrapper>
      <AddPostBtn src={AddBtn} onClick={AddPostOnClick} />
      <UpScrollBtn>
        <FiChevronsUp
          className="upscroll"
          type="button"
          onClick={UpScrollOnClick}
        >
          위로가기
        </FiChevronsUp>
      </UpScrollBtn>
    </>
  );
}

export default Search;
