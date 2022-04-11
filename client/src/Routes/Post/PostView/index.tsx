/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ComRender, AppDispatch } from 'index';
import { FiChevronsUp } from 'react-icons/fi';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import io from 'socket.io-client';
import userHolder from '../../../Image/Logo/welcome.svg';
import {
  Wrapper,
  FooterWrapper,
  PostBox,
  PostTopBox,
  PostUnpkIcon,
  PostPickIcon,
  WriterImgBox,
  WriterImg,
  PostWriter,
  PostBtnBox,
  PostMidBox,
  PostTitle,
  PostBounty,
  PostTagBox,
  PostTagList,
  PostTagItem,
  PostTagTitle,
  PostViewBox,
  CommentBox,
  CommentWriteForm,
  CommentWriteBox,
  CommentWriteName,
  CommentTitle,
  EditorBox,
  CommentItemList,
  CommentItem,
  CommentItemHead,
  CommentWriter,
  CommentItemBtnBox,
  CommentItemTitle,
  ViewerBox,
  CommonHideBtn,
  CommonBtn,
  ModalBack,
  ModalBox,
  ModalText,
  ModalBtnBox,
  ModalBtn,
  UpScrollBtn,
  BackBtn,
  PostBtn,
} from './styles';

const socket = io(`${process.env.REACT_APP_SERVER}`);

function PostView() {
  const { userData, itemData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [comments, setComments] = useState<any[]>([]);
  const [comId, setComId] = useState('');
  const [comWriterId, setComWriterId] = useState('');
  const [postWriterView, setPostWriterView] = useState(false);
  const [comModalView, setComModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const [comDelModalView, setComDelModalView] = useState(false);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [comPickModalView, setComPickModalView] = useState(false);
  const [postCon, setPostCon] = useState(itemData[0]);
  const [conTitle, setConTitle] = useState('');
  const [scrollY, setScrollY] = useState(0);

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
    writerImg: string;
    writerName: string;
    selection: boolean;
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
    writerImg: '',
    writerName: '',
    selection: false,
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
  }, [comModalView, comDelModalView, comPickModalView, setComPickModalView]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    };
  });

  const UpScrollOnClick = () => {
    if (!window.scrollY) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const regComOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (content !== '' && conTitle !== '') {
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

  const uploadComImg = async (blob: string | Blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    const url = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/upload/comment`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );
    return url.data.data;
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

  const pickComOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/select/comment`,
      {
        myId: data.writer,
        yourId: comWriterId,
        postId: data.id,
        commentId: comId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    setComPickModalView(!comPickModalView);
  };

  const delPostModalClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const postWriterOnClick = () => {
    setPostWriterView(!postWriterView);
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

  const postChatOnClick = () => {
    socket.emit(
      'make_room',
      userData.userInfo.id,
      data.writer,
      (roomId: string) => {
        navigate(`/chat/${roomId}/${data.writerName}`);
      },
    );
  };

  const comChatOnClick = (id: string, username: string) => {
    socket.emit('make_room', userData.userInfo.id, id, (roomId: string) => {
      navigate(`/chat/${roomId}/${username}`);
    });
  };

  const comPickOnClick = (id: string, comId: any) => {
    setComWriterId(id);
    setComId(comId);
    setComPickModalView(!comPickModalView);
  };

  const comPickModalClick = () => {
    setComPickModalView(!comPickModalView);
  };

  const goBackOnClick = () => {
    navigate(`/search`);
  };

  interface IComState {
    post_id: string;
    writer: string;
    title: string;
    content: string;
    writerName: string;
    writerImg: string;
    selection: boolean;
    _id: number;
  }

  return (
    <>
      <Nav />
      <BackBtn onClick={goBackOnClick}>{`< 목록으로 돌아가기`}</BackBtn>
      <Wrapper>
        <PostBox>
          <PostTopBox>
            {data.selection ? (
              <PostPickIcon>채택</PostPickIcon>
            ) : (
              <PostUnpkIcon>채택중</PostUnpkIcon>
            )}
            {data.writerImg ? (
              <WriterImgBox>
                <WriterImg src={data.writerImg} onClick={postWriterOnClick} />
              </WriterImgBox>
            ) : (
              <WriterImgBox>
                <WriterImg src={userHolder} onClick={postWriterOnClick} />
              </WriterImgBox>
            )}
            <PostWriter>{data.writerName}</PostWriter>
            {userInfo.id === data?.writer ? (
              <PostBtnBox>
                <CommonBtn onClick={postModifyOnClick}>수정</CommonBtn>
                <CommonBtn onClick={delPostModalClick}>삭제</CommonBtn>
              </PostBtnBox>
            ) : (
              <PostBtnBox>
                {isLogin ? (
                  <>
                    <CommonHideBtn />
                    <PostBtn onClick={postChatOnClick}>채팅</PostBtn>
                  </>
                ) : (
                  <>
                    <CommonHideBtn />
                    <CommonHideBtn />
                  </>
                )}
              </PostBtnBox>
            )}
          </PostTopBox>
          <PostMidBox>
            <PostTitle>{data.title}</PostTitle>
            <PostBounty>현상금 : {data.bounty}원</PostBounty>
          </PostMidBox>
          <PostTagBox>
            <PostTagList>
              {data.tag.map((el) => (
                <PostTagItem key={nanoid()}>
                  <PostTagTitle>{el}</PostTagTitle>
                </PostTagItem>
              ))}
            </PostTagList>
          </PostTagBox>
          <PostViewBox>
            <Viewer
              initialValue={postCon.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </PostViewBox>
        </PostBox>
        <CommentBox>
          {isLogin && userInfo.id !== data.writer ? (
            <CommentWriteForm>
              <CommentWriteBox>
                <CommentWriteName>{userInfo.username}</CommentWriteName>
                <CommonBtn onClick={regComOnClick}>등록</CommonBtn>
              </CommentWriteBox>
              <CommentTitle
                type="text"
                maxLength={26}
                placeholder="제목은 여기에"
                onChange={conTitleOnChange}
              />
              <EditorBox>
                <Editor
                  autofocus={false}
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
                  hooks={{
                    addImageBlobHook: async (blob, callback) => {
                      const imgUrl = uploadComImg(blob);
                      callback(await imgUrl, 'Image');
                    },
                  }}
                />
              </EditorBox>
            </CommentWriteForm>
          ) : null}
          <>
            <CommentItemList>
              {comments.map((com: IComState) => (
                <CommentItem key={nanoid()}>
                  <CommentItemHead>
                    {com.selection ? (
                      <PostPickIcon>채택글</PostPickIcon>
                    ) : (
                      <PostUnpkIcon>미채택</PostUnpkIcon>
                    )}
                    {com.writerImg ? (
                      <WriterImgBox>
                        <WriterImg src={com.writerImg} />
                      </WriterImgBox>
                    ) : (
                      <WriterImgBox>
                        <WriterImg src={userHolder} />
                      </WriterImgBox>
                    )}
                    <CommentWriter>{com.writerName}</CommentWriter>
                    {isLogin ? (
                      <>
                        {userInfo.id === com.writer ? (
                          <CommentItemBtnBox>
                            <CommonBtn
                              onClick={() => comOnClick(com._id, com.content)}
                            >
                              수정
                            </CommonBtn>
                            <CommonBtn
                              onClick={() => delComModalClick(com._id)}
                            >
                              삭제
                            </CommonBtn>
                          </CommentItemBtnBox>
                        ) : (
                          <CommentItemBtnBox>
                            {userInfo.id === data.writer && !data.selection ? (
                              <CommonBtn
                                onClick={() =>
                                  comPickOnClick(com.writer, com._id)
                                }
                              >
                                채택
                              </CommonBtn>
                            ) : (
                              <CommonHideBtn />
                            )}
                            <CommonBtn
                              onClick={() =>
                                comChatOnClick(com.writer, com.writerName)
                              }
                            >
                              채팅
                            </CommonBtn>
                          </CommentItemBtnBox>
                        )}
                      </>
                    ) : null}
                  </CommentItemHead>
                  <CommentItemTitle>{com.title}</CommentItemTitle>
                  <ViewerBox>
                    <Viewer
                      initialValue={com.content}
                      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    />
                  </ViewerBox>
                </CommentItem>
              ))}
            </CommentItemList>
          </>
        </CommentBox>
        {comModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>답글이 등록되었습니다</ModalText>
              <ModalBtn onClick={comModalOnClick}>확인</ModalBtn>
            </ModalBox>
          </ModalBack>
        ) : null}
        {failModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>제목과 본문에 모두 내용이 있어야 합니다</ModalText>
              <ModalBtn onClick={failModalOnClick}>확인</ModalBtn>
            </ModalBox>
          </ModalBack>
        ) : null}
        {comDelModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>답글을 삭제하실 건가요?</ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={delComOnClick}>네</ModalBtn>
                <ModalBtn onClick={delComModalClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
        {postDelModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>게시글을 삭제하실 건가요?</ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={delPostOnClick}>네</ModalBtn>
                <ModalBtn onClick={delPostModalClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
        {comPickModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>
                채택하시면 이를 취소할 수 없고, 현상금만큼 보유금이 차감되어
                채택자에게 전달됩니다
              </ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={pickComOnClick}>네</ModalBtn>
                <ModalBtn onClick={comPickModalClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
      </Wrapper>
      {scrollY > 500 ? (
        <UpScrollBtn>
          <FiChevronsUp
            className="upscroll"
            type="button"
            onClick={UpScrollOnClick}
          >
            위로가기
          </FiChevronsUp>
        </UpScrollBtn>
      ) : null}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default PostView;
