import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3px 0 212px 0;
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
    margin: 30px 0 200px 0;
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

export const ComBox = styled.div`
  width: 740px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.desktop2} {
    margin: 200px 0 0px 0;
  }
  @media ${(props) => props.theme.tablet} {
    margin: 0 0 2px 0;
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

export const ComTopBox = styled.div`
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

export const ComWriter = styled.div`
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

export const ComBtn = styled.button`
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

export const ComTitle = styled.input`
  width: 682px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  padding: 5px 0px 5px 5px;
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 auto 15px 25px;
  font-size: ${(props) => props.theme.fontSize.small};
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
    width: 553px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.mini};
    margin: 13px auto 12px 13px;
    width: 443px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    padding: 5px 5px 3px 5px;
    margin: 13px auto 6px 13px;
    width: 343px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    border-radius: 7px;
    margin: 10px auto 6px 15px;
    padding: 5px 5px 3px 5px;
    width: 260px;
  }
`;

export const ViewerBox = styled.div`
  width: 690px;
  height: 420px;
  margin: 7px auto 20px auto;
  padding: 0 0 21px 0;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
    height: 430px;
    margin: 20px auto 20px auto;
    padding: 0 0 20px 0;
  }
  @media ${(props) => props.theme.mobile} {
    width: 447px;
    height: 420px;
    margin: 0 auto 20px auto;
    padding: 9px 0 15px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 346px;
    height: 420px;
    margin: 0 auto 20px auto;
    padding: 10px 0 15px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 276px;
    height: 420px;
    margin: 10px auto 20px auto;
    padding: 0 0 15px 0;
  }
`;

export const ComModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ComModalBox = styled.div`
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

export const ComModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

export const ComModalBtn = styled.button`
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
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
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
