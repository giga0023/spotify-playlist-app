import { useState } from "react";

function App() {

  const [userSearch, setUserSearch] = useState([])
  const [trackList, setTrackList] = useState([])
  const [playlistName, setPlaylistName] = useState('')

  const addTrackToPlaylist = (track) => (
    setTrackList((prev) => {
      if (!prev.some((t) => t.id === track.id)) {
        return [track, ...prev]
      } else {
        return prev
      }
    })
  );

  const removeTrackToPlaylist = (track) => (
    setTrackList((prev) => {
      return prev.filter((t) => t.id !== track.id)
    })
  );

  const handleNameChange = ({target}) => (
    setPlaylistName(target.value)
  )


  return (
    <div>
      <h1>Playlist Spotify App</h1>
    </div>
  );
}

export default App