import styled from "styled-components";
import { Link } from "react-router-dom";
import { pixelToRem } from "utils";

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => ($gap ? $gap + "px" : "")};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + "px" : "")};
`;
const Layout = styled.div`
  width: 100%;
  max-width: ${pixelToRem(430)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Label = styled.label`
  font-weight: 300;
`;
const InputField = styled.div`
  width: 100%;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + "px" : "")};

  input {
    margin-top: 10px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.G_300};
  color: ${({ theme }) => theme.colors.G_800};
  border: none;
  border-radius: 8px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.blue_hover};
  }
`;
const LoginButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.G_100};
  border-radius: 8px;
  font-weight: 500;
  padding: 15px;
  border: none;
`;
const KakaoButton = styled.button`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fee500;
  border: none;
  border-radius: 8px;
  font-weight: 400;
`;
const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.G_500};
  }

  & div {
    padding: 0 10px;
    color: ${({ theme }) => theme.colors.G_500};
    font-weight: 300;
    user-select: none;
  }
`;
const RegistText = styled.span`
  font-size: 14px;
  margin-right: 4px;
`;
const StyledLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_primary};
`;

export {
  Body,
  Wrapper,
  Layout,
  Label,
  InputField,
  Input,
  LoginButton,
  KakaoButton,
  Divider,
  RegistText,
  StyledLink,
};

export const StyledLoader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
