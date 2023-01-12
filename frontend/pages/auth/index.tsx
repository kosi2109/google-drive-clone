import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { getCSRFCookie, googleUserLogin } from "../../api/backendApi";
import { login, logout, selectUser } from "../../features/userSlice";

function Auth() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/drive/my-drive");
    }
  }, []);

  const responseGoogle = (response: any) => {
    getCSRFCookie().then(() => {
      googleUserLogin(response.profileObj)
        .then((res) => {
          router.push("/drive/my-drive");
          dispatch(login(res.data));
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-400">
      <GoogleLogin
        clientId="814451914005-v5tqj51ej1vs8nr62nolf3ee2fap5ohn.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      >
        Google
      </GoogleLogin>
    </div>
  );
}

export default Auth;
