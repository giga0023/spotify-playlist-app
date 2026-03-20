function Track({track, onAction, action}) {
    return (
        <div>
            <p>{track.name} {track.artists[0].name} <button onClick={() => onAction(track)}>{action}</button></p>
        </div>
    );
};

export default Track;