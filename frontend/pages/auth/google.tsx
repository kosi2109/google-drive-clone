import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleApiCallback } from "../../api/backendApi";
import { login } from "../../features/userSlice";
import { logIn } from "../../utils/auth";

function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  
  const callback = async () => {
    const { data }  = await googleApiCallback(router.asPath.split("?")[1]);
    
    setLoading(false);
    logIn(JSON.stringify(data.user), data.access_token)
  } 

  // On page load, we take "search" parameters
  // and proxy them to /api/auth/callback on our Laravel API
  useEffect(() => {    
    callback();
  }, []);

  // Helper method to fetch User data for authenticated user
  // Watch out for "Authorization" header that is added to this call
  function fetchUserData() {
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((response: any) => {
        console.log(response);
      })
      .then((data : any) => {
        setUser(data);
      });
  }

  if (loading) {
    return <DisplayLoading />;
  } else {
    if (user != null) {
      return <DisplayData data={user} />;
    } else {
      return (
        <div>
          <DisplayData data={data} />
          <div style={{ marginTop: 10 }}>
            <button onClick={fetchUserData}>Fetch User</button>
          </div>
        </div>
      );
    }
  }
}

function DisplayLoading() {
  return <div>Loading....</div>;
}

function DisplayData(data: any) {
  return (
    <div>
      <samp>{JSON.stringify(data, null, 2)}</samp>
    </div>
  );
}

export default GoogleCallback;
