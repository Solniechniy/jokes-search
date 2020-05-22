import React, { useState, useEffect } from "react";
import RadioButton from "./common/RadioButton";
import JokeCard from "./common/JokeCard";
import styled from "styled-components";
import favIcon from "./icons/fav.svg";
import close from "./icons/close.svg";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  h1 {
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
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
  @media (min-width: 481px) and (max-width: 1280px) {
    justify-content: flex-end;
    h2 {
      display: none;
    }
  }
`;

const SideBarButton = styled.div`
  p {
    margin-left: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ababab;
  }

  display: none;
  @media (min-width: 481px) and (max-width: 1280px) {
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
`;

const Body = styled.section`
  box-sizing: content-box;
  padding: 40px 140px;
  
  width: calc(70vw - 280px);
  overflow-y: auto;
  max-height: 100vh;
  @media (min-width: 481px) and (max-width: 1280px) {
    padding: 40px 40px;
    width: 100%;
  }
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
`;

const Category = styled.button`
  outline: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => (props.isChecked ? "black" : "#ABABAB")};
  background: ${(props) => (props.isChecked ? "#F8F8F8" : "white")};
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
`;

const Favorites = styled.section`
  width: 30vw;
  height: 100vh;
  background-color: #f8f8f8;
  max-height: 100vh;
  overflow-y: auto;
  padding: 40px 40px 0 40px;
  @media (min-width: 481px) and (max-width: 1280px) {
    position: absolute;
    top: 0;
    right: 0;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    width: 40vw;
    min-width: 480px;
    transition: all 0.25s ease;
  }
`;

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
      <Body>
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
