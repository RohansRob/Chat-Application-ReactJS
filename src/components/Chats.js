import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import (useHistory) from 'react-router-dom';

import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);


  console.log(user);
  const handleLogout = async () => {
    await auth.signOut();

    history.push('/');

  }
  const getFile = async (url) => {
    const response = await fetch(url);
    //blob binary files (images)
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!user) {
      history.push('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": "0ffb6d6d-31dc-4c73-b62e-f7a51bee8c66",
        "user-name": user.email,
        "user-secret": user.uid,
      }

    })
      .then(() => {

        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users/',
              formdata,
              //later gonna put on env. variables 
              { headers: { "private-key": "5e025e8f-4650-4671-89b2-40356872cb15" } }
            )
              .then(() => setLoading(false))
              .catch((error)) => console.log(error))
       
         })
  })

}, [user, history]);

if (!user || loading) return 'loading...'

return (
  <div className="chats-page">
    <div className="nav-bar">
      <div className="logo-tab">
        Unichat
      </div>
      < div onClick={handleLogout} className="logout-tab">
        Logout
      </div>
    </div>

    <ChatEngine
      height="calc(100vh -66px)"
      projectID="0ffb6d6d-31dc-4c73-b62e-f7a51bee8c66"

      userName={user.email}
      userSecret={user.uid}
    />
  </div>

  // <h1>Chats</h1>  
);
}

export default Chats;