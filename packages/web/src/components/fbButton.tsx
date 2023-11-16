import React from 'react'

declare const FB: any

const FacebookTestButton: React.FC = () => {
    const checkLoginStatus = () => {
        FB.getLoginStatus(function (response: any) {
            if (response.status === 'connected') {
                // The user is logged in and has authenticated your app
                console.log('User is logged in and authenticated')
            } else {
                // The user is not logged in to Facebook or has not authenticated your app
                console.log('User is not logged in or not authenticated')
            }
        })
    }

    return <button onClick={checkLoginStatus}>Check Facebook Login Status</button>
}

export default FacebookTestButton
