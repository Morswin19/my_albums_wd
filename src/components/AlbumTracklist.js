import React from "react";

const AlbumTracklist = ({
  isLoading,
  songs,
  playingIndex,
  handlePlayClick,
  audioRef,
  setPlayingIndex,
  handleTrackEnd,
}) => {
  return (
    <div
      className="tracklistContainer"
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading ? (
        <p>Loading tracks...</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index} className="song">
              <span className="song-title">{song.title}</span>
              {song.previewUrl && (
                <button
                  type="button"
                  onClick={() => handlePlayClick(index, song.previewUrl)}
                  aria-label={playingIndex === index ? "Pause" : "Play"}
                >
                  {playingIndex === index ? "⏸" : "▶"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <audio ref={audioRef} onEnded={handleTrackEnd} />
    </div>
  );
};

export default AlbumTracklist;