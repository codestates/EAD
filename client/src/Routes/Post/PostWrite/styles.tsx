import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0 190px 0;
  @media ${(props) => props.theme.desktop2} {
    height: auto;
    min-height: 868px;
    margin: 0px 0 446px 0;
  }
  @media ${(props) => props.theme.tablet} {
    height: auto;
    min-height: 100%;
    margin: 20px 0 178px 0;
    padding: 0 0 220px 0;
  }
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 100%;
    padding: 0 0 106px 0;
    margin: 30px 0 179px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: auto;
    min-height: 100%;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: auto;
    min-height: 100%;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
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
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.desktop2} {
    margin: 200px 0 0 0;
  }
  @media ${(props) => props.theme.tablet} {
    width: 610px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 0 20px 0;
    width: 480px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 0 0 20px 0;
    width: 380px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0 0 20px 0;
    width: 310px;
  }
`;

export const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
  margin: 8px 25px 20px 25px;
  padding: 0px 0px 0px 0px;
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
    margin: 8px 25px 17px 25px;
  }
  @media ${(props) => props.theme.mobile} {
    height: 50px;
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 50px;
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
    height: 43px;
  }
`;

export const PostWriter = styled.div`
  width: 600px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 20px auto 0px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 500px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 370px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 270px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.mini};
    width: 200px;
  }
`;

export const PostMidBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: flex;
  @media ${(props) => props.theme.mobile} {
    margin: 12px 0 0 0;
  }
  @media ${(props) => props.theme.mobile1} {
    flex-direction: column;
    margin: 15px 0 0 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-direction: column;
    margin: 11px 0 0 0;
  }
`;

export const PostTitle = styled.input`
  width: 500px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 27px 15px 25px;
  @media ${(props) => props.theme.tablet} {
    width: 370px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 15px 12px 15px;
    width: 293px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 0 15px 6px 15px;
    width: 342px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0 15px 6px 15px;
    padding: 3px 0 3px 5px;
    width: 270px;
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

export const PostBountyBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 6px 0 0 0;
  @media ${(props) => props.theme.mobile1} {
    margin: 8px 5px 10px 17px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 8px 5px 10px 17px;
  }
`;

export const PostText = styled.span`
  font-size: ${(props) => props.theme.fontSize.mini};
  margin: 5px 5px 0 0px;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: 8px 5px 0 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: 8px 5px 0 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: 8px 5px 0 0px;
  }
`;

export const PostBounty = styled.select`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.black};
  width: 90px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  padding: 3px;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    width: 80px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 80px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 80px;
  }
`;

export const PostBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  margin: 10px 0px 10px 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 100px;
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
    width: 90px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px 0px 5px 5px;
    height: 27px;
    width: 60px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px 0px 5px 5px;
    height: 27px;
    width: 60px;
  }
`;

export const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 0 20px 25px;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 0 15px 16px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 0 0 15px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0 0 15px 15px;
  }
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0;
`;

export const TagItem = styled.li`
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

export const TagTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 3px;
`;

export const TagCloseIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  margin: 2px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.black};
  border-radius: 50%;
  background-color: ${(props) => props.theme.beige};
  cursor: pointer;
`;

export const TagInput = styled.input`
  width: 80px;
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.black};
  border: 2px solid ${(props) => props.theme.btnGreen};
  padding: 6px;
  border-radius: 10px;
  text-transform: lowercase;
`;

export const PostBotBox = styled.div`
  width: 690px;
  height: 420px;
  margin: 0 auto 20px auto;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
    height: 420px;
    margin: 0 auto 20px auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: 450px;
    height: 420px;
    margin: 0 auto 20px auto;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
    height: 420px;
    margin: 0 auto 20px auto;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 280px;
    height: 420px;
    margin: 0 auto 20px auto;
  }
`;

export const PostModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const PostModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PostModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const PostModalBtn = styled.button`
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
    box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  }
`;

export const FailModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const FailModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FailModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const FailModalBtn = styled.button`
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
    box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
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
