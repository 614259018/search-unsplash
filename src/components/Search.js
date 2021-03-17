import React, { useState } from "react";
import { ImHeart } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState([]);
  const [results, setResults] = useState([]);

  const key = process.env.REACT_APP_ACCESSKEY;

  const searchImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=` + key +`&query=${value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
      });
  };

  const history = useHistory();

  const sendProfile = (valueUsername) => {
    localStorage.setItem("keyUsername", valueUsername);
    history.push("/Profile");
  };

  return (
    <div className="container">
      <div className="search">
        <a href="/">Unsplash</a>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=" ..Search.. "
        />
        <button className="btnSearch" onClick={() => searchImages()}>
          <FaSearch />
        </button>
      </div>
      <div className="gallery">
        {results.map((item) => {
          return (
            <div className="items">
              <div className="content">
                <div className="username">
                  <img
                    className="profile_image"
                    key={item.id}
                    src={item.user.profile_image.medium}
                    onClick={() => {
                      sendProfile(item.user.username);
                    }}
                  />
                  <a
                    href="#"
                    className="name"
                    key={item.id}
                    onClick={() => {
                      sendProfile(item.user.username);
                    }}
                  >
                    {item.user.username}
                  </a>
                </div>
                <div className="img-over-hidden">
                  <img
                    className="regular"
                    key={item.id}
                    src={item.urls.regular}
                  />
                </div>
                <div className="like">
                  <p className="numLike" key={item.id}>
                    <ImHeart /> <span> </span>
                    <span> {item.likes} </span> <span>Likes</span>
                  </p>
                </div>
                <div className="comment">
                  <p className="namecomment" key={item.id}>
                    <span>{item.user.username}</span> {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Search;
