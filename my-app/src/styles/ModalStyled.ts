import styled, { keyframes, css } from 'styled-components';
import { pixelToRem, getStyledColor } from 'utils';
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  align-items: center;

  @media screen and (max-height: 768px) {
    align-items: unset;
    padding-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Presentation = styled.div`
  z-index: 1200;
  position: absolute;
`;

export const ModalClose = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: ${getStyledColor('white', 'high')};
  font-size: 30px;
`;

export const Modal = styled.div`
  position: absolute;
  min-width: ${pixelToRem(1000)};
  max-height: 80%;

  box-shadow:
    0px 11px 15px 0px rgba(0, 0, 0, 0.2),
    0px 9px 46px 0px rgba(0, 0, 0, 0.12),
    0px 24px 38px 0px rgba(0, 0, 0, 0.14);

  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 0.2s ease;
  overflow-y: scroll;
  align-items: center;
  background-color: ${getStyledColor('black', 100)};

  & p {
    color: ${getStyledColor('white', 'high')};
  }

  /* 스크롤바의 폭 너비 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${getStyledColor('teal', 900)}; /* 스크롤바 색상 */
    border-radius: 20px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: ${getStyledColor('teal', 700)}; /*스크롤바 뒷 배경 색상*/
  }

  @media screen and (max-width: 768px) {
    overflow-y: scroll !important;
  }
`;
export const ModalPosterContainer = styled.div`
  // background-color: rgb(0 0 0 / 71%);
  display: flex;
  flex-direction: column;
`;
export const ModalImgAndCotent = styled.div`
  display: flex;
`;
export const ModalPosterImgContainer = styled.div`
  position: relative;
  width: 600px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin: ${pixelToRem([100, 60, 0, 60])};
  padding-bottom: 50px;
`;
export const ImageBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
export const ImagePointerWrapper = styled.div`
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  gap: 5px;
`;
export const ImagePointer = styled.div<{ currentIndex: number; index: number }>`
  width: 52px;
  height: 51px;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 5px; /* 필요에 따라 조정하세요 */
  transition:
    border-color 0.3s ease,
    opacity 0.3s ease;

  ${({ currentIndex, index }) =>
    currentIndex === index
      ? `
    border-color: #00ffcc; 
    opacity: 1;
  `
      : `
    opacity: 0.5; 
  `}
  & > img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`;
export const ModalPosterImg = styled.img`
  object-fit: contain;
  width: 320px;
  height: 400px;

  box-shadow:
    1px 1px ${getStyledColor('black', 700)},
    2px 2px ${getStyledColor('white', 'medium')},
    3px 3px ${getStyledColor('black', 700)},
    4px 4px ${getStyledColor('white', 'medium')},
    5px 5px ${getStyledColor('black', 700)},
    6px 6px ${getStyledColor('white', 'medium')},
    7px 7px ${getStyledColor('black', 700)},
    8px 8px ${getStyledColor('black', 700)};
`;

export const ModalContent = styled.div`
  padding-right: 40px;
  padding-top: 40px;
  color: white;
`;
export const ModalOverview = styled.div`
  font-size: 18px;
  line-height: 2;
  font-weight: 300;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ModalTitle = styled.h2`
  padding: 0;
  font-size: 30px;
  margin: 60px 0 44px 0;
  white-space: nowrap;
`;

export const ModalSubject = styled.div`
  border-left: 10px solid ${getStyledColor('primary', 500)};
  padding: 1rem;
  border-bottom: 2px solid ${getStyledColor('primary', 500)};
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin: ${pixelToRem([20, 30, 0, 30])};
`;

export const ModalIntroduce = styled.div`
  line-height: 140%;
  color: white;
  margin: ${pixelToRem([20, 30, 0, 30])};
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CommentSection = styled.div`
  background-color: #fefefe;
  margin: ${pixelToRem([20, 30, 0, 30])};
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);

  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const HeartButton = styled.button<{
  $liked: boolean | undefined;
  $status: string;
}>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  align-items: center;
  justify-content: center;
  transform: scale(1.2);
  color: ${(props) => (props.$liked ? 'red' : 'black')};
  &:hover {
    color: ${(props) => (props.$liked ? 'darkred' : 'grey')};
  }
  &:disabled {
    cursor: not-allowed;
  }
  svg {
    font-size: 24px; // Adjust the size of the FaHeart icon
    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s;
    }

    animation: ${(props) =>
      props.$status === 'loading'
        ? css`
            ${pulseAnimation} 1s 2
          `
        : 'none'};
  }
`;
