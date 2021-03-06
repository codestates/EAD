/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { Viewer } from '@toast-ui/react-editor';
import { FiChevronsUp } from 'react-icons/fi';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { RootState, ItemRender, ComRender, AppDispatch } from 'index';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import noneHolder from '../../../Image/Logo/comments.svg';
import {
  Wrapper,
  FooterWrapper,
  ComBox,
  ComItem,
  ItemTop,
  ItemTitleBox,
  ItemTitle,
  BtnBox,
  ItemBtn,
  ViewerBox,
  ComDelModalBack,
  ComDelText,
  ComDelModalBox,
  ComDelModalBtnBox,
  ComDelModalBtn,
  UpScrollBtn,
  NoneBox,
  NoneImg,
  NoneText,
} from './styles';

function Mycomment() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [coms, setComs] = useState<any[]>([]);
  const [comId, setComId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [comDelModalView, setComDelModalView] = useState(false);
  const [comMoveModalView, setComMoveModalView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface ICom {
    content: string;
    createdAt: string;
    post_id: number;
    title: string;
    updatedAt: string;
    writer: number;
    writerName: string;
    __v: number;
    _id: number;
  }

  useEffect(() => {
    const getComs = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/mycomment`,
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
      setComs(item);
    };
    getComs();
  }, [comDelModalView]);

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

  const modComOnClick = (id: number, con: string) => {
    dispatch(ComRender([con]));
    navigate(`/comment/${id}`);
  };

  const delComModalClick = (id: number) => {
    setComId(id);
    setComDelModalView(!comDelModalView);
  };

  const delComClick = useCallback(() => {
    setComDelModalView(!comDelModalView);
  }, [comDelModalView, setComDelModalView]);

  const moveConfirmPostClick = useCallback(
    (id: number) => {
      setPostId(id);
      setComMoveModalView(!comMoveModalView);
    },
    [postId, setPostId, comMoveModalView, setComMoveModalView],
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

  const dontComClick = useCallback(() => {
    setComMoveModalView(!comMoveModalView);
  }, [comMoveModalView, setComMoveModalView]);

  return (
    <>
      <Nav />
      <Wrapper>
        {coms.length !== 0 ? (
          <ComBox>
            {coms.map((com: ICom) => (
              <ComItem key={nanoid()}>
                <ItemTop>
                  <ItemTitleBox>
                    <ItemTitle>{com.title}</ItemTitle>
                  </ItemTitleBox>
                  <BtnBox>
                    <ItemBtn onClick={() => moveConfirmPostClick(com.post_id)}>
                      ??????
                    </ItemBtn>
                    <ItemBtn
                      onClick={() => modComOnClick(com._id, com.content)}
                    >
                      ??????
                    </ItemBtn>
                    <ItemBtn onClick={() => delComModalClick(com._id)}>
                      ??????
                    </ItemBtn>
                  </BtnBox>
                </ItemTop>
                <ViewerBox>
                  <Viewer
                    initialValue={com.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </ViewerBox>
              </ComItem>
            ))}
          </ComBox>
        ) : (
          <NoneBox>
            <NoneImg src={noneHolder} />
            <NoneText>????????? ????????? ?????????</NoneText>
          </NoneBox>
        )}
        {comDelModalView ? (
          <ComDelModalBack>
            <ComDelModalBox>
              <ComDelText>????????? ???????????? ??????????</ComDelText>
              <ComDelModalBtnBox>
                <ComDelModalBtn onClick={delComOnClick}>???</ComDelModalBtn>
                <ComDelModalBtn onClick={delComClick}>?????????</ComDelModalBtn>
              </ComDelModalBtnBox>
            </ComDelModalBox>
          </ComDelModalBack>
        ) : null}
        {comMoveModalView ? (
          <ComDelModalBack>
            <ComDelModalBox>
              <ComDelText>?????? ???????????? ??????????????????????</ComDelText>
              <ComDelModalBtnBox>
                <ComDelModalBtn onClick={movePostClick}>???</ComDelModalBtn>
                <ComDelModalBtn onClick={dontComClick}>?????????</ComDelModalBtn>
              </ComDelModalBtnBox>
            </ComDelModalBox>
          </ComDelModalBack>
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

export default Mycomment;
