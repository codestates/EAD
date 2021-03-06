import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ItemRender, AppDispatch } from 'index';
import { Viewer } from '@toast-ui/react-editor';
import { FiChevronsUp } from 'react-icons/fi';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import noneHolder from '../../../Image/Logo/posts.svg';
import {
  Wrapper,
  FooterWrapper,
  PostBox,
  PostItem,
  ItemTitleBox,
  ItemTitle,
  MidBox,
  ItemBox,
  ItemBounty,
  ItemComCount,
  BtnBox,
  ItemBtn,
  ViewerBox,
  PostDelModalBack,
  PostDelText,
  PostDelModalBox,
  PostDelModalBtnBox,
  PostDelModalBtn,
  NoneBox,
  NoneImg,
  NoneText,
  UpScrollBtn,
} from './styles';

function Mypost() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [posts, setPosts] = useState<any[]>([]);
  const [postId, setPostId] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [postMoveModalView, setPostMoveModalView] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface IPost {
    bounty: number;
    comment: string[];
    content: string;
    createdAt: string;
    id: number;
    tag: string[];
    title: string;
    updatedAt: string;
    writer: number;
    writerName: string;
    __v: number;
    _id: number;
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/mypost`,
        { id: userInfo.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      const item = data.data.data;
      setPosts(item);
    };
    getPosts();
  }, [postDelModalView]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window ????????? ?????? ScrollY??? ??????
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
    watch(); // addEventListener ????????? ??????
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener ????????? ??????
    };
  });

  const delPostOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/${postId}`,
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
    setPostDelModalView(!postDelModalView);
  };

  const delPostModalClick = useCallback(
    (id: number) => {
      setPostId(id);
      setPostDelModalView(!postDelModalView);
    },
    [postId, setPostId, postDelModalView, setPostDelModalView],
  );

  const delPostClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const moveConfirmPostClick = useCallback(
    (id: number) => {
      setPostId(id);
      setPostMoveModalView(!postMoveModalView);
    },
    [postId, setPostId, postMoveModalView, setPostMoveModalView],
  );

  const movePostClick = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER}/posts/${postId}/content`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(ItemRender(data.data.data));
    navigate(`/post/${postId}`);
  };

  const dontPostClick = () => {
    setPostMoveModalView(!postMoveModalView);
  };

  const postModifyOnClick = (id: number, con: string) => {
    dispatch(ItemRender([{ content: con }]));
    navigate(`/post/modify/${id}`);
  };

  return (
    <>
      <Nav />
      <Wrapper>
        {posts.length !== 0 ? (
          <PostBox>
            {posts.map((post: IPost) => (
              <PostItem key={nanoid()}>
                <ItemTitleBox>
                  <ItemTitle>{post.title}</ItemTitle>
                </ItemTitleBox>
                <MidBox>
                  <ItemBox>
                    <ItemBounty>?????????: {post.bounty}???</ItemBounty>
                    <ItemComCount>?????????: {post.comment.length}???</ItemComCount>
                  </ItemBox>
                  <BtnBox>
                    <ItemBtn onClick={() => delPostModalClick(post.id)}>
                      ??????
                    </ItemBtn>
                    <ItemBtn
                      onClick={() => postModifyOnClick(post.id, post.content)}
                    >
                      ??????
                    </ItemBtn>
                    <ItemBtn onClick={() => moveConfirmPostClick(post.id)}>
                      ??????
                    </ItemBtn>
                  </BtnBox>
                </MidBox>
                <ViewerBox>
                  <Viewer
                    initialValue={post.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </ViewerBox>
              </PostItem>
            ))}
          </PostBox>
        ) : (
          <NoneBox>
            <NoneImg src={noneHolder} />
            <NoneText>????????? ???????????? ?????????</NoneText>
          </NoneBox>
        )}
        {postDelModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>???????????? ???????????? ??????????</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={delPostOnClick}>???</PostDelModalBtn>
                <PostDelModalBtn onClick={delPostClick}>?????????</PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
        ) : null}
        {postMoveModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>?????? ???????????? ??????????????????????</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={movePostClick}>???</PostDelModalBtn>
                <PostDelModalBtn onClick={dontPostClick}>
                  ?????????
                </PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
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

export default Mypost;
