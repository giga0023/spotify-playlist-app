import Track from "../Track/Track";

function TrackList({ tracks, onAction, action }) {
    return (
        <div>
            <ul>
                {tracks.map((t) => (
                    <Track key={t.id} track={t} onAction={onAction} action={action}/>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;