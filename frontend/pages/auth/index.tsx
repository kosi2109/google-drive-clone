import React, { useEffect, useState } from 'react'

function Auth() {
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/auth/google', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setLoginUrl( data.url ))
            .catch((error) => console.error(error));
    }, []);
    // useEffect(() => {
    //     fetch('http://localhost:8000/api/auth/google', {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error('Something went wrong!');
    //         })
    //         .then((data) => setLoginUrl( data.url ))
    //         .catch((error) => console.error(error));
    // }, []);

    return (
        <div>
            {loginUrl != null && (
                <a href={loginUrl}>Google Sign In</a>
            )}
        </div>
    );
}

export default Auth