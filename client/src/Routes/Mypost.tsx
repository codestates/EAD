import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ItemRender, AppDispatch } from 'index';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
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

const PostsBox = styled.div`
  margin: 0 auto 0 auto;
  height: auto;
  width: 600px;
`;

const PostsItem = styled.div`
  border: 1px solid ${(props) => props.theme.grey};
  margin: 0 auto 30px auto;
`;

const ItemTitle = styled.div`
  width: auto;
  max-width: 530px;
  height: 23px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  display: inline-block;
  padding: 6px;
  font-weight: bold;
  margin: 25px 25px 10px 25px;
  white-space: nowrap;
  overflow: hidden;
`;

const ViewerBox = styled.div`
  margin: 0 auto 0 auto;
  padding: 0 0 5px 0;
  width: 530px;
  height: auto;
  min-height: 50px;
  font-size: ${(props) => props.theme.fontSize.mini};
  // border: 2px solid ${(props) => props.theme.grey};
  .mk {
    margin: 0 0 0 20px;
    overflow: scroll;
  }
`;

const ItemBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 0;
`;

const ItemBounty = styled.div`
  width: 160px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 0 25px;
`;

const ItemComCount = styled.div`
  width: 130px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 0 25px;
`;

const ItemBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 60px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
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

const PostPlaceholder = styled.div``;

function Mypost() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [posts, setPosts] = useState<any[]>([]);
  const [postId, setPostId] = useState(0);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [postMoveModalView, setPostMoveModalView] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // console.log(postId);

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
    navigate('/mycomment');
  };

  const delPostModalClick = (id: number) => {
    setPostId(id);
    setPostDelModalView(!postDelModalView);
  };

  const delPostClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const moveConfirmPostClick = (id: number) => {
    setPostId(id);
    setPostMoveModalView(!postMoveModalView);
  };

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
          <PostsBox>
            {posts.map((post: IPost) => (
              <PostsItem key={nanoid()}>
                <ItemTitle>{post.title}</ItemTitle>
                <ViewerBox>
                  <Viewer
                    initialValue={post.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </ViewerBox>
                <ItemBox>
                  <ItemBounty>현상금: {post.bounty}원</ItemBounty>
                  <ItemComCount>답글수: {post.comment.length}개</ItemComCount>
                  <ItemBtn onClick={() => moveConfirmPostClick(post.id)}>
                    이동
                  </ItemBtn>
                  <ItemBtn
                    onClick={() => postModifyOnClick(post.id, post.content)}
                  >
                    수정
                  </ItemBtn>
                  <ItemBtn onClick={() => delPostModalClick(post.id)}>
                    삭제
                  </ItemBtn>
                </ItemBox>
              </PostsItem>
            ))}
          </PostsBox>
        ) : (
          <PostPlaceholder>작성한 게시글이 없네요</PostPlaceholder>
        )}
        {postDelModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>게시글을 삭제하실 건가요?</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={delPostOnClick}>네</PostDelModalBtn>
                <PostDelModalBtn onClick={delPostClick}>아니요</PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
        ) : null}
        {postMoveModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>해당 게시글로 이동하실건가요?</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={movePostClick}>네</PostDelModalBtn>
                <PostDelModalBtn onClick={dontPostClick}>
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

export default Mypost;