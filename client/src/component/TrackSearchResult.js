import React from 'react'

export default function TrackSearchResult({track, chooseTrack}) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div onClick={handlePlay}>
      <img src={track.albumUrl} style={{height: '64px', width: '64px'}}/>
      <div>
        <div>{track.title}</div>
        <div>{track.artists}</div>
      </div>
    </div>
  )
}
