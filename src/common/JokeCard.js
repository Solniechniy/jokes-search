import React from "react";
import styled from "styled-components";
import logo from "../icons/joke.svg";
import link from "../icons/link.svg";
import heartEmpty from "../icons/heart-empty.svg";
import heartFull from "../icons/heart-full.svg";

const Wrapper = styled.div`
  background: ${(props) => (props.inverse ? "#fff" : "#F8F8F8")};
  border-radius: 20px;
  width: 100%;
  padding: 67px 40px 40px 40px;
  position: relative;
  margin: 20px 0;
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
export default function Card({
  isFavorite = false,
  inverse,
  joke,
  addJoke,
  deleteJoke,
}) {
  const { id, value, url, updated_at, categories = [] } = joke;

  const difference = (Date.now() - new Date(updated_at)) / 1000;
  const lastUpdate = Math.round(difference / 60 / 60);

  return (
    <Wrapper inverse={inverse}>
      <Heart>
        <img
          onClick={() => (isFavorite ? deleteJoke(id) : addJoke(joke))}
          src={isFavorite ? heartFull : heartEmpty}
          alt="heart"
        />
      </Heart>
      <CardContent>
        <IconSection inverse={inverse}>
          <img src={logo} alt="logo" />
        </IconSection>
        <InfoSection>
          <Id>
            ID:{" "}
            <a href={url} target="_blank">
              {id}
            </a>
            <img src={link} alt="link" />
          </Id>
          {value}
          <Details>
            <p>Last update: {lastUpdate} hours ago</p>
            {categories.length > 0 && (
              <Category isChecked>{categories[0]}</Category>
            )}
          </Details>
        </InfoSection>
      </CardContent>
    </Wrapper>
  );
}
