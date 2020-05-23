import React, { useState, useEffect } from "react";
import RadioButton from "./common/RadioButton/RadioButton";
import JokeCard from "./common/JokeCard/JokeCard";
import favIcon from "./icons/fav.svg";
import close from "./icons/close.svg";
import {
  Wrapper,
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
} from "./styles";

const categories = ["animal", "career", "celebrity", "dev"];

const radioButtons = [
  { label: "Random", value: "random" },
  { label: "For categories", value: "categories" },
  { label: "Search", value: "search" },
];

const checkFavorite = (favorites, joke) => {
  return favorites.some((favorite) => favorite.id === joke.id);
};

function App() {
  const [selectedOption, setSelectedOption] = useState("random");
  const [favorites, setFavorites] = useState([]);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("animal");
  const [inputValue, setInputValue] = useState("");
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    let savedFavorites = JSON.parse(localStorage.getItem("fav"));

    if (savedFavorites && savedFavorites.length > 0)
      setFavorites(savedFavorites);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let request = "https://api.chucknorris.io/jokes/";
    if (selectedOption === "random" || selectedOption === "categories") {
      request += "random";
      if (selectedOption === "categories" && selectedCategory.length > 0) {
        request += `?category=${selectedCategory}`;
      }
    } else {
      request += `search?query=${inputValue}`;
    }
    try {
      const response = await fetch(request);
      const data = await response.json();
      if (selectedOption === "random" || selectedOption === "categories") {
        setJokes([data]);
      } else {
        setJokes(data.result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addFavorite = ({ id, value, url, updated_at }) => {
    if (!favorites.some((joke) => joke.id === id)) {
      setFavorites([
        ...favorites,
        {
          id: id,
          value: value,
          url: url,
          updated_at: updated_at,
        },
      ]);
      localStorage.setItem(
        "fav",
        JSON.stringify([
          ...favorites,
          { id: id, value: value, updated_at: updated_at, url: url },
        ])
      );
    }
  };

  const deleteFavorite = (id) => {
    let newFavorites = favorites.filter((joke) => joke.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("fav", JSON.stringify(newFavorites));
  };

  return (
    <Wrapper>
      <Body isOpen={isFavOpen}>
        <Header>
          <h1>MSI 2020</h1>
          <SideBarButton onClick={() => setIsFavOpen(!isFavOpen)}>
            <img src={favIcon} alt={favIcon} />
            <p>Favorites</p>
          </SideBarButton>
        </Header>
        <Introduction>
          <h1>Hey!</h1>
          <p>Let's try to find a joke for you:</p>
        </Introduction>
        <form onSubmit={handleFormSubmit}>
          <RadioButton
            label={"Random"}
            value={"random"}
            selectedOption={selectedOption}
            handleChange={setSelectedOption}
          />
          <RadioButton
            label={"From categories"}
            value={"categories"}
            selectedOption={selectedOption}
            handleChange={setSelectedOption}
          />

          <>
            {selectedOption === "categories" &&
              categories &&
              categories.map((category, index) => (
                <Category
                  key={index}
                  isChecked={selectedCategory === category}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </Category>
              ))}
          </>
          <RadioButton
            label={"Search"}
            value={"search"}
            selectedOption={selectedOption}
            handleChange={setSelectedOption}
          />
          <>
            {selectedOption === "search" && (
              <SearchInput
                value={inputValue}
                placeholder={"Free text search..."}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}
          </>
          <SubmitButton type="submit">Get a joke</SubmitButton>
        </form>
        <>
          {jokes &&
            jokes.map((joke, index) => (
              <JokeCard
                key={index}
                isFavorite={checkFavorite(favorites, joke)}
                joke={joke}
                addJoke={addFavorite}
                deleteJoke={deleteFavorite}
              />
            ))}
        </>
      </Body>
      <Background isOpen={isFavOpen} onClick={() => setIsFavOpen(!isFavOpen)} />
      <Favorites isOpen={isFavOpen}>
        <FavoritesHeader>
          <h2>Favorites</h2>
          <SideBarButton onClick={() => setIsFavOpen(!isFavOpen)}>
            <img src={close} alt={"closeIcon"} />
            <p>Favorites</p>
          </SideBarButton>
        </FavoritesHeader>

        {favorites.map((joke, index) => (
          <JokeCard
            key={index}
            isFavorite
            inverse
            joke={joke}
            addJoke={addFavorite}
            deleteJoke={deleteFavorite}
          />
        ))}
      </Favorites>
    </Wrapper>
  );
}

export default App;
