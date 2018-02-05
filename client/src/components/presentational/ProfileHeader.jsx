import React from 'react';
import { membershipIconCreator } from '../../utils/messages';

const ProfileHeader = ({
  userData,
  viewProfile,
  showProfile
}) => {
  const defaultUserImage = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1510302773/default_image_yi56ca.jpg'
return (<div>
      <div className="profile-image-holder">
        <a href="#confirmationModal" className="modal-trigger">
        { userData.imageUrl
          ?
          <img
            src={userData.imageUrl} 
            className="responsive-img"
            id="image-target"
            alt=""/>
          :
          <img
            src={defaultUserImage}
            className="responsive-img"
            id="image-target"
            alt=""
          />
        }
        </a>
      </div>
      
      <div className="userInfoDisplay">
        <h4>{`${userData.firstName}
        ${userData.lastName}`}
        </h4>
        <p>Joined: 
          {userData.createdAt} | {userData.email}
        </p>
        <p>Member level:
        {membershipIconCreator(userData.membership 
          || 
          process.env.DEFAULT_MEMBERSHIP)} </p>
        <div className="row">
          <div className="col s12 l12">
            {!viewProfile
            ?
            <button className="btn waves-teal waves-effect custom" 
              onClick={showProfile}>View Full Profile</button>
            :
            ''
            }
          </div>
        </div>
      </div>
  </div>);
};

export default ProfileHeader;
