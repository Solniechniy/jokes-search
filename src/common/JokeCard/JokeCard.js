import React from "react";
import logo from "../../icons/joke.svg";
import link from "../../icons/link.svg";
import heartEmpty from "../../icons/heart-empty.svg";
import heartFull from "../../icons/heart-full.svg";

import {
  Heart,
  CardContent,
  Category,
  Details,
  Id,
  InfoSection,
  IconSection,
  Wrapper,
} from "./JokeCard.styles";

export default function Card({
  isFavorite = false,
  inverse,
  joke,
  addJoke,
  deleteJoke,
}) {
  const { id, content, updated_at, categories = [] } = joke;

  const difference =
    (Date.now() - new Date(updated_at.replace(" ", "T")).getTime()) / 1000; // need for ios support

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
          {/* <Id>
            ID:{" "}
            <a href={url} target="_blank">
              {id}
            </a>
            <img src={link} alt="link" />
          </Id> */}
          {content}
          {lastUpdate && (
            <Details>
              <p>Last update: {lastUpdate} hours ago</p>
              {categories.length > 0 && (
                <Category isChecked>{categories[0]}</Category>
              )}
            </Details>
          )}
        </InfoSection>
      </CardContent>
    </Wrapper>
  );
}
