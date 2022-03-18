import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { IoMdArrowDropleft } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Team from 'Components/Team';
import logo1 from '../Image/Logo/1.png';
import logo2 from '../Image/Logo/2.png';
import logo3 from '../Image/Logo/3.png';
import logo4 from '../Image/Logo/4.png';
import logo5 from '../Image/Logo/5.png';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
  .team {
    font-size: ${(props) => props.theme.fontSize.veryHuge};
    color: ${(props) => props.theme.green};
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      font-size: ${(props) => props.theme.fontSize.huge};
    }
  }
`;

const TeamWrapper = styled.div`
  position: absolute;
  width: 100%;
  right: 0px;
  z-index: 3;
`;

const Box = styled.div`
  width: 100%;
  height: 100vh;
`;

const Logo = styled.img`
  width: 700px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.beige};
`;

const TextBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 10px;
`;

const Number = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
`;
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 50px;
`;
const Descriprtion = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  margin-bottom: 5px;
`;

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .search {
    font-size: ${(props) => props.theme.fontSize.huge};
  }
`;
const SearchInput = styled.input`
  width: 500px;
  height: 30px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px;
  margin-right: 20px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

function Home() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = axios.post(
      `${process.env.REACT_APP_SERVER}/search`,
      { keyword: value },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch({ type: 'Search', payload: data });
    setValue('');
  };

  const handleOnClick = () => {
    setOpen(true);
  };

  return (
    <>
      {open ? (
        <TeamWrapper>
          <Team setOpen={setOpen} />
        </TeamWrapper>
      ) : null}
      <Wrapper>
        <IoMdArrowDropleft className="team" onClick={handleOnClick} />
        <Logo src={logo1} />
        <SearchBox>
          <Text>개발하면서 궁금했던 점을</Text>
          <Text>검색해보세요!</Text>
          <Searchbar>
            <Form onSubmit={handleOnSubmit}>
              <SearchInput
                onChange={handleOnChange}
                value={value}
                placeholder="여기에 입력해주세요!"
              />
              <Button type="submit">
                <FaSearch className="search" />
              </Button>
            </Form>
          </Searchbar>
        </SearchBox>
      </Wrapper>
      <Box>
        <LeftBox>
          <Logo src={logo2} />
          <TextBox>
            <Number>01</Number>
            <Title>공식문서들 봐도 이해가 안되셨나요?</Title>
            <Descriprtion>
              이해가 안된 부분만 발취해서 질문해보세요.
            </Descriprtion>
            <Descriprtion>
              다양한 분야의 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
        </LeftBox>
      </Box>
      <Box>
        <RightBox>
          <TextBox>
            <Number>02</Number>
            <Title>알고리즘에 고민이 많으신가요?</Title>
            <Descriprtion>
              문제를 풀다가 막히는 부분이 생기면 질문해보세요.
            </Descriprtion>
            <Descriprtion>
              알고리즘의 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
          <Logo src={logo3} />
        </RightBox>
      </Box>
      <Box>
        <LeftBox>
          <Logo src={logo4} />
          <TextBox>
            <Number>03</Number>
            <Title>개발하면서 오류를 만나셨나요?</Title>
            <Descriprtion>여러분이 겪은 오류를 공유해주세요.</Descriprtion>
            <Descriprtion>
              수많은 오류를 해결한 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
        </LeftBox>
      </Box>
      <Box>
        <RightBox>
          <TextBox>
            <Number>04</Number>
            <Title>협업 시에 해결되지 않은 문제가 있으신가요?</Title>
            <Descriprtion>해결되지 않은 문제를 공유해주세요.</Descriprtion>
            <Descriprtion>
              수많은 협업을 진행해 온 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
          <Logo src={logo5} />
        </RightBox>
      </Box>
    </>
  );
}

export default Home;
