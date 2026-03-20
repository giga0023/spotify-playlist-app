import Track from "../Track/Track";

function Playlist({ tracks, onAction, action, playlistName, onNameChange, onSave }) {
    return (
        <div>
            <input value={playlistName} onChange={onNameChange} />
            <ul>
                {tracks.map((t) => (
                    <Track key={t.id} track={t} onAction={onAction} action={action} />
                ))}
            </ul>
            <button onClick={() => onSave(playlistName)}>Save Playlist on Spotify</button>
        </div>
    );
};

export default Playlist;