/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { RootState, ItemRender, AppDispatch } from 'index';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import {
  Wrapper,
  FooterWrapper,
  PostBox,
  PostTopBox,
  PostWriter,
  PostMidBox,
  PostTitle,
  PostBountyBox,
  PostText,
  PostBounty,
  PostBtn,
  TagBox,
  TagList,
  TagItem,
  TagTitle,
  TagCloseIcon,
  TagInput,
  PostBotBox,
  PostModalBack,
  PostModalBox,
  PostModalText,
  PostModalBtn,
  FailModalBack,
  FailModalBox,
  FailModalText,
  FailModalBtn,
  BackBtn,
} from './styles';

function Post() {
  const { userData } = useSelector((state: RootState) => state);
  const { accessToken, userInfo, isLogin } = userData;
  const [writer, setWriter] = useState(userInfo?.username);
  const initialTag: string[] = [];
  const [tag, setTag] = useState(initialTag);
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [postId, setPostId] = useState('');
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const [moneyFailView, setMoneyFailView] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const delTag = useCallback(
    (targetIdx: any) => {
      setTag(tag.filter((_: string, idx: number) => idx !== targetIdx));
    },
    [tag, setTag],
  );

  const addTag = useCallback(
    (e: any) => {
      const filtered = tag.filter((el) => el === e.target.value);
      if (e.target.value !== '' && filtered.length === 0) {
        setTag([...tag, e.target.value.toLowerCase()]);
        e.target.value = '';
      }
    },
    [tag, setTag],
  );

  const bountyOnChange = useCallback(
    (e: any) => {
      setBounty(e.target.value);
    },
    [bounty, setBounty],
  );

  const titleOnChange = useCallback(
    (e: any) => {
      setTitle(e.target.value);
    },
    [title, setTitle],
  );

  const registOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (tag.length !== 0 && title !== '' && content !== '') {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/posts`,
        {
          id: userInfo.id,
          title,
          tag,
          bounty,
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
      if (data.data.data.message) {
        setMoneyFailView(!moneyFailView);
      } else {
        setPostId(data.data.data.id);
        dispatch(ItemRender([{ content: data.data.data.content }]));
        setPostModalView(!postModalView);
      }
    } else if (tag.length === 0 || title === '' || content === '') {
      setFailModalView(!failModalView);
    }
  };

  const uploadPostImg = async (blob: string | Blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    const url = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/upload/post`,
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

  const moneyFailOnClick = () => {
    setMoneyFailView(!moneyFailView);
  };

  const goBackOnClick = () => {
    navigate(`/search`);
  };

  return (
    <>
      <Nav />
      <BackBtn onClick={goBackOnClick}>{`< ???????????? ????????????`}</BackBtn>
      <Wrapper>
        <PostBox>
          {isLogin ? (
            <PostTopBox>
              <PostWriter>{writer}</PostWriter>
              <PostBtn onClick={registOnClick}>??????</PostBtn>
            </PostTopBox>
          ) : (
            <PostTopBox>
              <PostWriter>???????????? ???????????????</PostWriter>
            </PostTopBox>
          )}
          <PostMidBox>
            <PostTitle
              autoFocus
              type="text"
              maxLength={26}
              placeholder="????????? ?????????"
              onChange={titleOnChange}
            />
            <PostBountyBox>
              <PostText>????????? :</PostText>
              <PostBounty onChange={bountyOnChange}>
                <option value="0">0</option>
                <option value="1000">1,000</option>
                <option value="2000">2,000</option>
                <option value="3000">3,000</option>
                <option value="4000">4,000</option>
                <option value="5000">5,000</option>
                <option value="6000">6,000</option>
                <option value="7000">7,000</option>
                <option value="8000">8,000</option>
                <option value="9000">9,000</option>
                <option value="10000">10,000</option>
              </PostBounty>
            </PostBountyBox>
          </PostMidBox>
          <TagBox>
            <TagList>
              {tag.map((tag, idx) => (
                <TagItem key={nanoid()}>
                  <TagTitle>{tag}</TagTitle>
                  <TagCloseIcon onClick={() => delTag(idx)}>x</TagCloseIcon>
                </TagItem>
              ))}
            </TagList>
            <TagInput
              type="text"
              onKeyUp={(e) => (e.key === 'Enter' ? addTag(e) : null)}
              placeholder="????????? ?????????"
            />
          </TagBox>
          <PostBotBox>
            <Editor
              autofocus={false}
              height="420px"
              initialEditType="markdown"
              ref={editorRef}
              placeholder="???????????? ???????????? ???????????????"
              toolbarItems={[
                ['bold', 'italic', 'strike'],
                ['hr'],
                ['image', 'link'],
                ['ul', 'ol'],
                ['code', 'codeblock'],
              ]}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imgUrl = uploadPostImg(blob);
                  callback(await imgUrl, 'alt_text');
                },
              }}
            />
          </PostBotBox>
        </PostBox>
        {postModalView ? (
          <PostModalBack>
            <PostModalBox>
              <PostModalText>???????????? ?????????????????????</PostModalText>
              <PostModalBtn onClick={postModalOnClick}>??????</PostModalBtn>
            </PostModalBox>
          </PostModalBack>
        ) : null}
        {failModalView ? (
          <FailModalBack>
            <FailModalBox>
              <FailModalText>
                ??????, ??????, ????????? ?????? ????????? ????????? ?????????
              </FailModalText>
              <FailModalBtn onClick={failModalOnClick}>??????</FailModalBtn>
            </FailModalBox>
          </FailModalBack>
        ) : null}
        {moneyFailView ? (
          <FailModalBack>
            <FailModalBox>
              <FailModalText>
                ????????? ??????????????? ????????? ???????????? ???????????????
              </FailModalText>
              <FailModalBtn onClick={moneyFailOnClick}>??????</FailModalBtn>
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

export default Post;
