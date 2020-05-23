import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  h1 {
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
  }
`;
const Background = styled.div`
  display: none;
  @media (min-width: 481px) and (max-width: 1280px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    height: 100vh;
    width: 100vw;
    transition: opacity 300ms ease-in-out;
    opacity: 0.5;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const FavoritesHeader = styled.header`
  display: flex;
  justify-content: space-between;
  h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ababab;
  }
  @media (min-width: 320px) and (max-width: 1280px) {
    justify-content: flex-end;
    h2 {
      display: none;
    }
  }
`;

const SideBarButton = styled.div`
  display: none;
  p {
    margin-left: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ababab;
  }
  @media (min-width: 481px) and (max-width: 1280px) {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
  }
`;

const Body = styled.section`
  box-sizing: content-box;
  padding: 40px 140px;

  width: calc(70vw - 280px);
  overflow-y: auto;
  max-height: 100vh;
  @media (min-width: 320px) and (max-width: 1280px) {
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
    width: 100vw;
  }
  @media (min-width: 481px) and (max-width: 1280px) {
    padding: 40px 40px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    padding: 20px 20px;
  }
`;

const Introduction = styled.div`
  margin: 78px 0 43px;
  h1 {
    font-weight: bold;
    font-size: 32px;
    line-height: 44px;
  }
  p {
    font-weight: 500;
    font-size: 24px;
    line-height: 44px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    h1 {
      font-weight: bold;
      font-size: 32px;
      line-height: 44px;
    }
    p {
      font-weight: 500;
      font-size: 24px;
      line-height: 44px;
    }
  }
`;

const Category = styled.button`
  outline: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ isChecked }) => (isChecked ? "black" : "#ABABAB")};
  background: ${({ isChecked }) => (isChecked ? "#F8F8F8" : "white")};
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 2px solid #f8f8f8;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 6px 15px;
  margin: 10px;
`;

const SearchInput = styled.input`
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #333;
  outline: none;
  border: 2px solid #333333;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  min-height: 30px;
  padding: 10px 0 10px 15px;
  ::placeholder {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #ababab;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(92.01deg, #8ea7ff 0%, #7291ff 100%);
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  padding: 10px 40px;
  outline: none;
  margin 20px 0 30px;
  border: none;
`;

const Favorites = styled.section`
  width: 33vw;
  min-width: 480px;
  height: 100vh;
  background-color: #f8f8f8;
  max-height: 100vh;
  overflow-y: auto;
  padding: 40px 40px 0 40px;
  @media (min-width: 481px) and (max-width: 1280px) {
    position: absolute;
    top: 0;
    right: 0;

    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    width: 40vw;
    min-width: 480px;
    transition: all 0.25s ease;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px 20px 0 20px;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    width: 100vw;
    transition: all 0.25s ease;
    min-width: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
`;

export {
  Header,
  Favorites,
  FavoritesHeader,
  SubmitButton,
  SearchInput,
  SideBarButton,
  Category,
  Introduction,
  Body,
  Background,
  Wrapper,
};
