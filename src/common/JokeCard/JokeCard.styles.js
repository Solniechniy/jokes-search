import styled from "styled-components";

const Wrapper = styled.div`
  background: ${(props) => (props.inverse ? "#fff" : "#F8F8F8")};
  border-radius: 20px;
  width: 100%;
  padding: 48px 30px 12px 26px;
  position: relative;
  margin: 20px 0;
  @media (min-width: 320px) and (max-width: 1280px) {
    padding: 49px 25px 20px 20px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconSection = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.inverse ? "#F8F8F8" : "#fff")};
  border-radius: 20px;
`;

const InfoSection = styled.div`
  width: calc(100% - 60px);
  margin-left: 20px;
`;

const Id = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #ababab;
  a {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #8ea7ff;
    text-decoration: underline;
  }
  img {
    margin-left: 5px;
  }
`;
const Details = styled.div`
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  color: #ababab;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const Category = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 2px;
  color: black;
  background: white;
  text-transform: uppercase;
  border: 2px solid #f8f8f8;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 6px 20px;
`;

const Heart = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export {
  Heart,
  CardContent,
  Category,
  Details,
  Id,
  InfoSection,
  IconSection,
  Wrapper,
};
