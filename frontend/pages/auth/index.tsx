import React, { useEffect, useState } from 'react'
import { googleLogin } from '../../api/backendApi';

function Auth() {
    const [loginUrl, setLoginUrl] = useState(null);

    const callGoogle = async ()=> {
        const {data} = await googleLogin();
        setLoginUrl(data.url)
    }

    useEffect(() => {
        callGoogle()
    }, []);
    
    return (
        <div>
            {loginUrl != null && (
                <a href={loginUrl}>Google Sign In</a>
            )}
        </div>
    );
}

export default Auth