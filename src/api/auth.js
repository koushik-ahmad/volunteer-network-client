export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
    }

    // get jwt token 
    fetch('https://volunteer-network-server-dusky.vercel.app/jwt', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // localStorage is not best place to store jwt token
            localStorage.setItem('token', data.token);
        });

};

