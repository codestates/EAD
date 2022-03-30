import styled from 'styled-components';
import logo from '../Image/Logo/ead.png';

const Wrapper = styled.div`
  height: 10.5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.green};
  padding: 20px 0px;
  bottom: 0;
  @media ${(props) => props.theme.mobile} {
    height: 15vh;
    padding-left: 20px;
  }
`;
const UpBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftBoxText = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: normal;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin-bottom: 20px;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

const DownBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin-top: 5px;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin-top: 5px;
  }
`;

const Logo = styled.img`
  width: 200px;
  @media ${(props) => props.theme.mobile} {
    width: 165px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 170px;
  }
`;
const Service = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  @media ${(props) => props.theme.mobile} {
    flex-direction: row;
    justify-content: flex-start;
  }
`;
const Contact = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  @media ${(props) => props.theme.mobile} {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.small};
    margin-right: 50px;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;
const Contents = styled.ul`
  @media ${(props) => props.theme.mobile} {
    display: flex;
  }
`;

const Content = styled.li`
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    width: 50px;
    margin-right: 20px;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <UpBox>
        <LeftBox>
          <Logo src={logo} />
          <LeftBoxText>서울특별시 강남구 서초구 서초중앙로 220</LeftBoxText>
        </LeftBox>
        <Service>
          <Title>Service</Title>
          <Contents>
            <Content>
              <a
                target="_blank"
                href="https://github.com/codestates/EAD/wiki"
                rel="noreferrer"
              >
                Wiki
              </a>
            </Content>

            <Content>
              <a
                target="_blank"
                href="https://github.com/codestates/EAD/tree/main"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Content>
          </Contents>
        </Service>
        <Contact>
          <Title>Contact</Title>
          <Contents>
            <Content>
              <a
                target="_blank"
                href="https://github.com/EBinY"
                rel="noreferrer"
              >
                윤의빈
              </a>
            </Content>
            <Content>
              <a
                target="_blank"
                href="https://github.com/jhwook"
                rel="noreferrer"
              >
                전현욱
              </a>
            </Content>
            <Content>
              <a
                target="_blank"
                href="https://github.com/apeachicetea"
                rel="noreferrer"
              >
                김대윤
              </a>
            </Content>
          </Contents>
        </Contact>
      </UpBox>
      <DownBox>© 2022 The A-Team, All Rights Reserved</DownBox>
    </Wrapper>
  );
}

export default Footer;
