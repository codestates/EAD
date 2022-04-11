import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from 'index';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import {
  Wrapper,
  FooterWrapper,
  ComBox,
  ComTopBox,
  ComWriter,
  ComBtn,
  ComTitle,
  ViewerBox,
  ComModalBack,
  ComModalBox,
  ComModalText,
  ComModalBtn,
  FailModalBack,
  FailModalBox,
  FailModalText,
  FailModalBtn,
} from './styles';

function Comment() {
  const { userData, comData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [writer, setWriter] = useState(userInfo?.username);
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState('');
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const [con, setCon] = useState(comData[0]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/comments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        const item = res.data.data;
        setWriter(item.writerName);
        setTitle(item.title);
        setPostId(item.post_id);
      });
  }, []);

  const registOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (content !== '') {
      await axios.patch(
        `${process.env.REACT_APP_SERVER}/posts/${id}/modify/comment`,
        {
          id: userInfo.id,
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
      setPostModalView(!postModalView);
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

  const postModalOnClick = () => {
    navigate(`/post/${postId}`);
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
  };

  const titleOnChange = useCallback(
    (e: any) => {
      setTitle(e.target.value);
    },
    [title, setTitle],
  );

  return (
    <>
      <Nav />
      <Wrapper>
        <ComBox>
          {isLogin ? (
            <ComTopBox>
              <ComWriter>{writer}</ComWriter>
              <ComBtn onClick={registOnClick}>완료</ComBtn>
            </ComTopBox>
          ) : (
            <ComTopBox>
              <ComWriter>로그인을 해야합니다</ComWriter>
            </ComTopBox>
          )}
          <ComTitle
            autoFocus
            type="text"
            value={title}
            maxLength={26}
            onChange={titleOnChange}
          />
          <ViewerBox>
            <Editor
              autofocus={false}
              height="438px"
              initialEditType="markdown"
              initialValue={con}
              ref={editorRef}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              toolbarItems={[
                ['bold', 'italic', 'strike'],
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
          </ViewerBox>
        </ComBox>
        {postModalView ? (
          <ComModalBack>
            <ComModalBox>
              <ComModalText>답글이 수정되었습니다</ComModalText>
              <ComModalBtn onClick={postModalOnClick}>확인</ComModalBtn>
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
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Comment;
