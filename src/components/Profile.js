import React, { useState, useEffect } from "react";
import { ImHeart } from "react-icons/im";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import { HiPhotograph } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { MdDescription } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    ProfileUsername();
  }, []);

  const key = process.env.REACT_APP_ACCESSKEY;

  const ProfileUsername = () => {
    fetch(
      `https://api.unsplash.com/users/` + usernameProfile + `/photos?client_id=` + key
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
    fetch(
      `https://api.unsplash.com/users/` + usernameProfile + `?client_id=` + key
    )
      .then((res) => res.json())
      .then((data01) => {
        setUser(data01);
        console.log(data01);
      });
  };

  const usernameProfile = localStorage.getItem("keyUsername");

  return (
    <div className="container">
      <div className="search">
        <a className="logo" href="/">
          Unsplash
        </a>
      </div>
      {Object.keys(user).length !== 0 ? (
        <div className="profile-info-group">
          <div className="Profile-img">
            <img src={user.profile_image.medium} />
          </div>
          <div className="info-group">
            <div className="head-user">
              <h2>{user.username}</h2>
              <div className="follow">
                <p>
                  <RiUserFollowFill />
                  <span> </span>Following<span> </span>
                  {user.following_count}
                </p>
                <p>
                  <RiUserAddFill />
                  <span> </span>Followers<span> </span>
                  {user.followers_count}
                </p>
              </div>
            </div>
            <p className="user-bio">
              <MdDescription /> {user.bio}
            </p>
            <p className="user-address">
              <MdLocationOn /> {user.location}
            </p>
          </div>
          <div className="photos-like-collections">
            <p className="total_photos">
              <HiPhotograph /> Photo {user.total_photos}
            </p>
            <p className="total_likes">
              <BsFillHeartFill /> Likes {user.total_likes}
            </p>
            <p className="total_collections">
              <MdDescription /> Collection {user.total_collections}
            </p>
          </div>
        </div>
      ) : null}
      <div className="gallery">
        {profile.map((item) => {
          return (
            <div className="items">
              <div className="profile-user">
                <div className="content">
                  <div className="username"></div>
                  <div className="img-over">
                    <img
                      className="regular"
                      key={item.id}
                      src={item.urls.regular}
                    />
                  </div>
                  <div className="like">
                    <p className="numLike" key={item.id}>
                      <ImHeart /> <span> </span> {item.likes} <span> </span> <span> Likes </span>
                    </p>
                  </div>
                  <div className="comment">
                    <p className="namecomment" key={item.id}>
                      <span>{item.user.username}</span> {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
