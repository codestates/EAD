/* eslint-disable react/no-children-prop */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ComRender, AppDispatch } from 'index';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';

const Wrapper = styled.div`
  width: 100%;
  min-height: 618px;
  margin: 0 0 200px 0;
  .dot {
    font-size: ${(props) => props.theme.fontSize.medium};
    cursor: pointer;
  }
  .dotS {
    font-size: ${(props) => props.theme.fontSize.small};
    cursor: pointer;
  }
`;

const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

const PostBox = styled.div`
  width: 835px;
  margin: 0 auto 30px auto;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const PostWriter = styled.div`
  width: 600px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 100px 0 54px;
`;

const PostMidBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: flex;
  margin: 0 0 0px 15px;
`;

const PostTitle = styled.div`
  width: 550px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 10px 52px 0 30px;
`;

const PostBounty = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 140px;
  margin: 40px 0px 0px 0px;
`;

const PostTagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 710px;
  margin: 5px 0 5px 38px;
`;

const PostTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0;
`;

const PostTagItem = styled.li`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.beige};
  padding: 0 8px 0 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 4px 0px;
  background: ${(props) => props.theme.btnGreen};
`;

const PostTagTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 3px;
`;

const PostBotBox = styled.div`
  width: 830px;
  min-height: 100px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 2px solid ${(props) => props.theme.grey};
  .mk {
    margin: 0 0 0 20px;
    overflow: scroll;
  }
`;

const CommentBox = styled.div`
  width: 835px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

const CommentWriteForm = styled.form``;

const CommentWriteBox = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const CommentWriteName = styled.div`
  width: 730px;
  padding: 7px 0 3px 37px;
  font-size: ${(props) => props.theme.fontSize.mini};
`;

const CommentTitle = styled.input`
  width: 500px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 52px 0 30px;
`;

const CommentWriteBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  margin: 15px 30px 15px 15px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 100px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const CommentItemBox = styled.div``;

const CommentItemList = styled.ul``;

const CommentItem = styled.li`
  border: 1px solid ${(props) => props.theme.grey};
  .comMk {
    overflow: scroll;
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 91%;
    padding: 10px;
    margin: 0 0 0px 28px;
  }
`;

const CommentItemHead = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const CommentWriter = styled.div`
  width: 730px;
  padding: 7px 0 3px 37px;
  font-size: ${(props) => props.theme.fontSize.mini};
`;

const CommentItemBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  margin: 10px 10px 10px 0px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 60px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const CommentItemTitle = styled.div`
  width: auto;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  // border: 1px solid ${(props) => props.theme.grey};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 10px 52px 0 30px;
`;

const ComModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ComModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ComModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ComModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const FailModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FailModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FailModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const FailModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const ModalMenuBox = styled.div`
  width: 75px;
  height: 78px;
  position: absolute;
  top: 110px;
  right: 220px;
  background-color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.lightGrey};
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  z-index: 10;
  @media ${(props) => props.theme.mobile} {
    /* width: 100%;
    right: 0px; */
  }
`;

const ModalMenus = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 15px;
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  a {
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
      width: 100%;
      &:hover {
        background-color: ${(props) => props.theme.pink};
        color: ${(props) => props.theme.black};
      }
    }
  }
`;

const ModalMenuBtn = styled.button`
  cursor: pointer;
  width: 45px;
  background-color: ${(props) => props.theme.beige};
  font-size: ${(props) => props.theme.fontSize.mini};
  border: none;
  margin: 0px;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    transition: all 0.5s ease-in-out;
    &:hover {
      padding: 3px 0px;
      color: ${(props) => props.theme.black};
    }
  }
`;

const ComDelText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ComDelModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ComDelModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ComDelModalBtnBox = styled.div``;

const ComDelModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const PostDelModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PostDelText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const PostDelModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostDelModalBtnBox = styled.div``;

const PostDelModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

function PostView() {
  const { userData, itemData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [comments, setComments] = useState<any[]>([]);
  const [comId, setComId] = useState('');
  const [postFuncView, setPostFuncView] = useState(false);
  const [comModalView, setComModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const [comDelModalView, setComDelModalView] = useState(false);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [postCon, setPostCon] = useState(itemData[0]);
  const [conTitle, setConTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  interface Data {
    bounty: number;
    comment: string[];
    comments: object[];
    content: string;
    createdAt: string;
    id: number;
    tag: string[];
    title: string;
    updatedAt: string;
    writer: string;
    writerName: string;
    __v: number;
    _id: number;
  }

  const [data, setData] = useState<Data>({
    bounty: 0,
    comment: [''],
    comments: [{}],
    content: '',
    createdAt: '',
    id: 0,
    tag: [''],
    title: '',
    updatedAt: '',
    writer: '',
    writerName: '',
    __v: 0,
    _id: 0,
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const getPost = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/posts/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      const item = data.data.data;
      setData(item);
      setComments(item.comments);
    };
    getPost();
  }, [comModalView, comDelModalView]);

  const regComOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (content !== '') {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/${id}/add/comment`,
        {
          id: userInfo.id,
          title: conTitle,
          content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      setComModalView(!comModalView);
    } else if (content === '') {
      setFailModalView(!failModalView);
    }
  };

  const conTitleOnChange = (e: any) => {
    setConTitle(e.target.value);
  };

  const delComOnClick = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER}/posts/${comId}/delete/comment`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    setComDelModalView(!comDelModalView);
  };

  const delComModalClick = (id: any) => {
    setComId(id);
    setComDelModalView(!comDelModalView);
  };

  const delPostOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/${id}`,
      {
        id: userInfo.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    navigate('/');
  };

  const delPostModalClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const postFuncOnClick = () => {
    setPostFuncView(!postFuncView);
  };

  const comModalOnClick = () => {
    setComModalView(!comModalView);
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
  };

  const comOnClick = (id: number, con: string) => {
    dispatch(ComRender([con]));
    navigate(`/comment/${id}`);
  };

  const postModifyOnClick = () => {
    navigate(`/post/modify/${id}`);
  };

  interface IComState {
    post_id: string;
    writer: string;
    title: string;
    content: string;
    writerName: string;
    _id: number;
  }

  return (
    <>
      <Nav />
      <Wrapper>
        {postFuncView ? (
          <ModalMenuBox>
            <ModalMenus>
              <ModalMenuBtn onClick={postModifyOnClick}>수정</ModalMenuBtn>
              <ModalMenuBtn onClick={delPostModalClick}>삭제</ModalMenuBtn>
            </ModalMenus>
          </ModalMenuBox>
        ) : null}
        <PostBox>
          <PostTopBox>
            <PostWriter>{data.writerName}</PostWriter>
            {userInfo.id === data?.writer ? (
              <HiOutlineDotsHorizontal
                className="dot"
                onClick={postFuncOnClick}
              />
            ) : null}
          </PostTopBox>
          <PostMidBox>
            <PostTitle>{data.title}</PostTitle>
            <PostBounty>현상금: {data.bounty}원</PostBounty>
            <PostTagBox>
              <PostTagList>
                {data.tag.map((el) => (
                  <PostTagItem key={nanoid()}>
                    <PostTagTitle>{el}</PostTagTitle>
                  </PostTagItem>
                ))}
              </PostTagList>
            </PostTagBox>
          </PostMidBox>
          <PostBotBox>
            <Viewer
              initialValue={postCon.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </PostBotBox>
        </PostBox>
        <CommentBox>
          {isLogin ? (
            <CommentWriteForm>
              <CommentWriteBox>
                <CommentWriteName>{userInfo.username}</CommentWriteName>
                <CommentWriteBtn onClick={regComOnClick}>등록</CommentWriteBtn>
                <CommentTitle
                  type="text"
                  placeholder="제목은 여기에"
                  onChange={conTitleOnChange}
                />
              </CommentWriteBox>
              <Editor
                height="250px"
                initialEditType="markdown"
                initialValue=""
                ref={editorRef}
                placeholder="마크다운 양식으로 작성하세요"
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                toolbarItems={[
                  ['bold', 'italic'],
                  ['hr'],
                  ['image', 'link'],
                  ['ul', 'ol'],
                  ['code', 'codeblock'],
                ]}
              />
            </CommentWriteForm>
          ) : null}
          <CommentItemBox>
            <CommentItemList>
              {comments.map((com: IComState) => (
                <CommentItem key={nanoid()}>
                  <CommentItemHead>
                    <CommentWriter>{com.writerName}</CommentWriter>
                    {userInfo.id === com.writer ||
                    userInfo.id === data.writer ? (
                      <>
                        <CommentItemBtn
                          onClick={() => comOnClick(com._id, com.content)}
                        >
                          수정
                        </CommentItemBtn>
                        <CommentItemBtn
                          onClick={() => delComModalClick(com._id)}
                        >
                          삭제
                        </CommentItemBtn>
                      </>
                    ) : null}
                  </CommentItemHead>
                  <CommentItemTitle>{com.title}</CommentItemTitle>
                  <Viewer
                    initialValue={com.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </CommentItem>
              ))}
            </CommentItemList>
          </CommentItemBox>
        </CommentBox>
        {comModalView ? (
          <ComModalBack>
            <ComModalBox>
              <ComModalText>답글이 등록되었습니다</ComModalText>
              <ComModalBtn onClick={comModalOnClick}>확인</ComModalBtn>
            </ComModalBox>
          </ComModalBack>
        ) : null}
        {failModalView ? (
          <FailModalBack>
            <FailModalBox>
              <FailModalText>본문에 내용이 있어야 합니다</FailModalText>
              <FailModalBtn onClick={failModalOnClick}>확인</FailModalBtn>
            </FailModalBox>
          </FailModalBack>
        ) : null}
        {comDelModalView ? (
          <ComDelModalBack>
            <ComDelModalBox>
              <ComDelText>답글을 삭제하실 건가요?</ComDelText>
              <ComDelModalBtnBox>
                <ComDelModalBtn onClick={delComOnClick}>네</ComDelModalBtn>
                <ComDelModalBtn onClick={delComModalClick}>
                  아니요
                </ComDelModalBtn>
              </ComDelModalBtnBox>
            </ComDelModalBox>
          </ComDelModalBack>
        ) : null}
        {postDelModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>게시글을 삭제하실 건가요?</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={delPostOnClick}>네</PostDelModalBtn>
                <PostDelModalBtn onClick={delPostModalClick}>
                  아니요
                </PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
        ) : null}
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default PostView;
