// Salva il token di accesso che estraiamo con getAccessToken() per poterlo usare in tutte le funzioni
let accessToken = null;

// Reinderizza l'utente alla pagina di login di Spotify
const redirectToSpotifyLogin = () => {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    return window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://127.0.0.1:5173/callback&scope=playlist-modify-public`
};

// Scambia il code con il token di accesso di Spotify
const getAccessToken = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://127.0.0.1:5173/callback'
            })
        })
    if (response.ok) {
        const jsonResponse = await response.json()
        accessToken = jsonResponse.access_token
        return jsonResponse.access_token
    }
} catch (error) {
    console.log(error)
}
};

// Restituisce array di canzoni in base alla ricerca dell'utente
const searchTracks = async (query) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            headers : {'Authorization' : `Bearer ${accessToken}`}
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse.tracks.items
        }
    } catch (error) {
        console.log(error)
    }
};

// Ottiene ID utente loggato - crea la playlist e aggiunge le canzoni
const savePlaylist = async (playlistName, tracks) => {
    try {
        const firstResponse = await fetch('https://api.spotify.com/v1/me', {
            headers : {'Authorization' : `Bearer ${accessToken}`}
        })
        const firstJson = await firstResponse.json()
        const userId = firstJson.id
        const secondResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: playlistName })
        })
        const secondJson = await secondResponse.json()
        const playlistId = secondJson.id
        const thirdResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: tracks.map(t => t.uri) })
        })
    } catch (error) {
        console.log(error)
    }
};
