// Reinderizza l'utente alla pagina di login di Spotify
const redirectToSpotifyLogin = () => {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    return window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://127.0.0.1:5173/callback&scope=playlist-modify-public`
};

