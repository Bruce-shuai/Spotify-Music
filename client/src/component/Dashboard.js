import React, {useState, useEffect} from 'react'
import useAuth from '../custom-hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
  clientId: 'f7d50426e1f2420faadf6e5527bdc7dd',
})

export default function Dashboard({code}) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

  }, [accessToken])

  function chooseTrack(track) {
    console.log('track', track);
    setPlayingTrack(track)
    setSearch('')
  }


  let cancel = false;
  useEffect(() => {
    if (cancel) return;
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    // setSearchResults()
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(res.body.tracks.items.map(track => {
        // 这里的reduce也是用得非常好的
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.length < smallest.length) return image
            return smallest;
          }, track.album.images[0])

        return {
          artists: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      }))
    })
    return () => cancel = true;
  }, [search, accessToken])

  return (
    <div className="dashboard">
      {/* {code} */}
      <input 
        className="input" 
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => {
          console.log(e.target.value);
          setSearch(e.target.value)
        }}
      />
      <div>
        {
          searchResults.map(track => <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>)
        } 
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
    </div>
  )
}
