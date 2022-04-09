import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 868px;
  margin: 0px 0 200px 0;
  .toastui-editor-contents {
    font-size: 17px;
  }
  @media ${(props) => props.theme.desktop2} {
    height: auto;
    min-height: 868px;
    margin: 0px 0 446px 0;
  }
  @media ${(props) => props.theme.tablet} {
    height: auto;
    min-height: 868px;
    margin: 20px 0 166px 0;
    padding: 0 0 0px 0;
    .toastui-editor-contents {
      font-size: 16px;
    }
  }
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 743px;
    padding: 0 0 0px 0;
    margin: 30px 0 202px 0;
    .toastui-editor-contents {
      font-size: 15px;
    }
  }
  @media ${(props) => props.theme.mobile1} {
    height: auto;
    min-height: 607px;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
    .toastui-editor-contents {
      font-size: 12px;
    }
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: auto;
    min-height: 536px;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
    .toastui-editor-contents {
      font-size: 11px;
    }
  }
`;

export const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

export const PostBox = styled.div`
  width: 740px;
  height: auto;
  margin: 0 auto 30px auto;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.tablet} {
    width: 610px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 480px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 380px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 310px;
  }
`;

export const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
  margin: 8px 25px 0px 25px;
  padding: 0px 0px 8px 0px;
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
    height: 50px;
  }
`;

export const PostUnpkIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0px;
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.beige};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 30px;
    width: 36px;
  }
`;

export const PostPickIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0px;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 30px;
    width: 36px;
  }
`;

export const WriterImgBox = styled.div`
  height: 45px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.btnGreen};
  margin: auto 0px auto 5px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 35px;
    width: 43px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 30px;
    width: 33px;
  }
`;

export const WriterImg = styled.img`
  height: 45px;
  border-radius: 50%;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 35px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 35px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 30px;
  }
`;

export const PostWriter = styled.div`
  width: 400px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 20px auto 8px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 206px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 144px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 20px auto 5px;
    width: 108px;
  }
`;

export const PostBtnBox = styled.div`
  display: flex;
  margin: 0px;
`;

export const PostMidBox = styled.div`
  margin: 20px 0 14px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media ${(props) => props.theme.tablet} {
    margin: 17px 0 14px 0;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 13px 0 10px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 13px 0 10px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 13px 0 10px 0;
  }
`;

export const PostTitle = styled.div`
  width: auto;
  max-width: 670px;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  padding: 7px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  margin: auto auto auto 24px;
  @media ${(props) => props.theme.tablet} {
    max-width: 545px;
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile} {
    max-width: 440px;
    font-size: ${(props) => props.theme.fontSize.mini};
    margin: auto auto auto 14px;
  }
  @media ${(props) => props.theme.mobile1} {
    max-width: 340px;
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto auto auto 14px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    max-width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: auto auto auto 14px;
  }
`;

export const PostBounty = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: auto;
  margin: 15px auto auto 24px;
  padding: 8px 8px 6px 8px;
  float: right;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  text-align: center;
  font-family: 'Hanna';
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    padding: 8px 8px 6px 8px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

export const PostTagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 690px;
  margin: auto;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 450px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 280px;
  }
`;

export const PostTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0;
`;

export const PostTagItem = styled.li`
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

export const PostTagTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 3px;
`;

export const PostViewBox = styled.div`
  margin: 15px auto 22px auto;
  padding: 0 12px;
  width: 664px;
  height: auto;
  min-height: 100px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 8px;
  @media ${(props) => props.theme.tablet} {
    width: 534px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 424px;
    margin: 10px auto 15px auto;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 326px;
    margin: 5px auto 13px auto;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 256px;
    margin: 5px auto 13px auto;
  }
`;

export const CommentBox = styled.div`
  width: 740px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  @media ${(props) => props.theme.tablet} {
    width: 610px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 480px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 380px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 310px;
  }
`;

export const CommentWriteForm = styled.form`
  border: 2px solid ${(props) => props.theme.btnGreen};
  padding: 0 0 15px 0;
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    padding: 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 0 5px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 0 5px 0;
  }
`;

export const CommentWriteBox = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 25px 0 0;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    padding: 5px 17px 0px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 9px 0px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 9px 0px 0px;
  }
`;

export const CommentWriteName = styled.div`
  width: 650px;
  padding: 0px 0 0px 25px;
  font-size: ${(props) => props.theme.fontSize.mini};
  @media ${(props) => props.theme.tablet} {
    width: 518px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
    padding: 0px 0 0px 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 308px;
    padding: 0px 0 0px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 240px;
    padding: 0px 0 0px 15px;
  }
`;

export const CommentTitle = styled.input`
  width: 680px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 10px 23px;
  @media ${(props) => props.theme.tablet} {
    width: 552px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 432px;
    margin: 0 0px 10px 18px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 341px;
    margin: 5px 0px 10px 14px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 5px 0px 10px 15px;
  }
`;

export const EditorBox = styled.div`
  padding: 0 0 10px 0;
  margin: 0 auto 5px auto;
  width: 690px;
  height: auto;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 442px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
    padding: 0 0 6px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 280px;
    padding: 0 0 6px 0;
  }
`;

export const CommentItemList = styled.ul``;

export const CommentItem = styled.li`
  border: 2px solid ${(props) => props.theme.btnGreen};
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
`;

export const CommentItemHead = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 0px 0 10px 0;
  margin: 23px 23px 10px 23px;
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
    margin: 23px 23px 10px 23px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 23px 23px 10px 23px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px 15px 10px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px 15px 10px 15px;
  }
`;

export const CommentWriter = styled.div`
  width: 400px;
  margin: 0 0 0 10px;
  font-size: ${(props) => props.theme.fontSize.mini};
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 272px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 204px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 167px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    width: 115px;
  }
`;

export const CommentItemBtnBox = styled.div`
  display: flex;
  flex-direction: flex;
  margin: auto 0px auto 0;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
  }
  @media ${(props) => props.theme.mobile1} {
  }
  @media ${(props) => props.theme.iPhone12Pro} {
  }
`;

export const CommentItemTitle = styled.div`
  width: auto;
  max-width: 650px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  display: inline-block;
  padding: 8px;
  font-weight: bold;
  margin: 10px 0 20px 24px;
  white-space: nowrap;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    max-width: 500px;
  }
  @media ${(props) => props.theme.mobile} {
    max-width: 440px;
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: 3px 0 15px 23px;
  }
  @media ${(props) => props.theme.mobile1} {
    max-width: 350px;
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 6px 0 10px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    max-width: 280px;
    font-size: ${(props) => props.theme.fontSize.dust};
    margin: 6px 0 10px 15px;
  }
`;

export const ViewerBox = styled.div`
  padding: 0 12px 0px 12px;
  margin: 0px auto 22px auto;
  width: 664px;
  height: auto;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 8px;
  @media ${(props) => props.theme.tablet} {
    width: 532px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0px auto 19px auto;
    width: 404px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 0px auto 14px auto;
    width: 318px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0px auto 14px auto;
    width: 250px;
  }
`;

export const CommonHideBtn = styled.div`
  width: 60px;
  height: 30px;
  margin: 10px 10px 10px 10px;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 25px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 5px;
    height: 27px;
    width: 40px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 2px;
    height: 27px;
    width: 40px;
  }
`;

export const CommonBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  margin: 10px 0px 10px 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 60px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  }
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    height: 27px;
    width: 46px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px 0px 5px 5px;
    height: 27px;
    width: 40px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.dust};
    margin: 5px 0px 5px 5px;
    height: 27px;
    width: 40px;
  }
`;

export const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalBox = styled.div`
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

export const ModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const ModalBtnBox = styled.div``;

export const ModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.btnGreen};
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

export const UpScrollBtn = styled.div`
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
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 25px;
    height: 25px;
    right: 4px;
    bottom: 240px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 25px;
    height: 25px;
    right: 4px;
    bottom: 240px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 25px;
    height: 25px;
    right: 8px;
    bottom: 240px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 40px;
    height: 40px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
`;

export const BackBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: none;
  position: absolute;
  top: 125px;
  left: 50px;
  cursor: pointer;
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
    top: 100px;
    left: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 100px;
    left: 15px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 70px;
    left: 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 70px;
    left: 35px;
  }
`;

export const PostBtn = styled(CommonBtn)``;
