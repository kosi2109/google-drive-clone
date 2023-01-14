import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";

function Auth() {
  const router = useRouter();

  const { status } = useSession();
  
  if (status === 'authenticated') {
    router.push('/drive/my-drive');
  }

  const responseGoogle = async (response: any) => {    
    const status = await signIn('credentials' ,{
      callbackUrl : '/',
      redirect : false,
      email : response?.profileObj?.email,
      googleId : response?.profileObj?.googleId,
      imageUrl : response?.profileObj?.imageUrl,
      name : response?.profileObj?.name,
    });

    if (status?.ok) router.push('/drive/my-drive');
  };

  return ( status === 'unauthenticated' &&
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