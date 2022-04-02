import styled from 'styled-components';

interface IProps {
  onClick: () => void;
  name: string;
  bg: string;
  cl: string;
}

interface IStackButton {
  bgColor: string;
  color: string;
}

const Btn = styled.button<IStackButton>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 120px;
  height: 32px;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  @media ${(props) => props.theme.tablet} {
    width: 92px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 80px;
    height: 17px;
    margin: 1px;
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 80px;
    height: 17px;
    margin: 1px;
    font-size: ${(props) => props.theme.fontSize.dust};
  }
  &:hover {
    font-weight: bold;
  }
`;

function Button({ name, onClick, bg, cl }: IProps) {
  return (
    <Btn onClick={() => onClick()} bgColor={bg} color={cl}>
      {name}
    </Btn>
  );
}

export default Button;
