import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
    interface Window {
        fbAsyncInit: () => void
    }
}

declare const FB: any

window.fbAsyncInit = function () {
    FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v9.0',
    })

    FB.AppEvents.logPageView()
}
;(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
        return
    }
    js = d.createElement(s) as HTMLScriptElement
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
    }
})(document, 'script', 'facebook-jssdk')

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
