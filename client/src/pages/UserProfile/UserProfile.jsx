import React, { useEffect } from "react";
import { useState } from "react";
import LeftSidebar from "../../component/leftSidebar/LeftSidebar";
import Avatar from "../../component/avatar/Avatar";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../action/currentUser";

function UserProfile({ slideIn }) {
  const { id } = useParams();
  const [Switch, setSwitch] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  console.log("Current user : ", currentUser);
  const users = useSelector((state) => state.users);
  console.log("users lists : ", users);
  const currentProfile = users.filter((user) => user._id === id)[0];

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button
                className="edit-profile-btn"
                type="button"
                onClick={() => setSwitch(true)}
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
