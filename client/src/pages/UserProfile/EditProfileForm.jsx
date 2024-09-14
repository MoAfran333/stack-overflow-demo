import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../action/users";
import "./UserProfile.css";
import { setCurrentUser } from "../../action/currentUser";

function EditProfileForm({ currentUser, setSwitch }) {
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  console.log(currentUser.result);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update Tags Field");
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }));
    }

    // Code I Wrote - Beginning
    // const updatedUser1 = { ...currentUser?.result };
    // const updatedUser = {
    //   ...updatedUser1,
    //   name: name,
    //   about: about,
    //   tags: tags,
    // };
    // console.log("updatedUser : ", updatedUser);
    // dispatch(setCurrentUser(updatedUser));

    const line1 = JSON.parse(localStorage.getItem("Profile")).result;
    const token = JSON.parse(localStorage.getItem("Profile")).token;
    const result = { ...line1, name: name, about: about, tags: tags };

    const updatedUser = { result, token };
    console.log(updatedUser);
    localStorage.setItem("Profile", JSON.stringify(updatedUser));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    // Code I Wrote - End

    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About Me</h3>
          <textarea
            name=""
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
