import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { googleUserLogin } from "../../api/backendApi";

function Auth() {
  const [loginUrl, setLoginUrl] = useState(null);

  const responseGoogle = (response: any) => {
    googleUserLogin(response.profileObj)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <GoogleLogin
        clientId="814451914005-v5tqj51ej1vs8nr62nolf3ee2fap5ohn.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Auth;
