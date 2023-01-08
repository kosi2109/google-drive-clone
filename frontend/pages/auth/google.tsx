import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [user, setUser] = useState(null);
  const router = useRouter();
    console.log(router.query.code);
    
  // On page load, we take "search" parameters
  // and proxy them to /api/auth/callback on our Laravel API
  useEffect(() => {
    axios
      .get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .get(
            `http://localhost:8000/api/auth/google/callback?${
              router.asPath.split("?")[1]
            }`,
            {
              headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
              },
              withCredentials: true,
            }
          )
          .catch((data) => {
            console.log(data);
            
          })
          .then((data) => {
            setLoading(false);
            router.push('/');
          });
      });
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
      });
    //   .then((data) => {
    //     setUser(data);
    //   });
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
