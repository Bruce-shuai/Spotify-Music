import React from 'react'

const AUTH_URL = 
"https://accounts.spotify.com/authorize?client_id=f7d50426e1f2420faadf6e5527bdc7dd&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
export default function Login() {
  return (
    <a className="btn btn-background-slide" href={AUTH_URL}>  {/* 这里真是一个神奇的跳转*/}
      Login with Spotify
    </a>
  )
}
