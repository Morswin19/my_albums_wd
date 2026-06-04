import React, { useState, useRef, useEffect } from "react";
import "../styles/Album.css";
import { fetchAlbumTracklist } from "../services/discogsService";
import { fetchITunesAlbumTracks } from "../services/itunesService";
import RecordPlayerAsset from "../imageAssets/RecordPlayerAsset";
import AlbumTracklist from "./AlbumTracklist";

const Album = (props) => {
  const [isOpen, setIsOpen] = useState(props.autoOpen || false);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);

  const loadTracks = async () => {
    setIsLoading(true);
    try {
      // Fetch both Discogs (for exact tracklist) and iTunes (for audio previews) concurrently
      const [discogsSongs, itunesSongs] = await Promise.all([
        props.id ? fetchAlbumTracklist(props.id) : Promise.resolve([]),
        fetchITunesAlbumTracks(props.title, props.artist),
      ]);

      let mergedSongs = [];

      if (discogsSongs && discogsSongs.length > 0) {
        // Use Discogs as the base tracklist to avoid deluxe/bonus tracks from iTunes
        mergedSongs = discogsSongs.map((dTrack, index) => {
          let preview = null;
          if (itunesSongs && itunesSongs.length > 0) {
            const normalize = (s) =>
              s.toLowerCase().replace(/[^a-z0-9]/g, "");
            const dTitle = normalize(dTrack.title);

            // 1. Exact match first
            let match = itunesSongs.find(
              (iTrack) => normalize(iTrack.title) === dTitle,
            );

            // 2. Substring match (safeguarded against short strings like "I" matching accidentally)
            if (!match && dTitle.length > 3) {
              match = itunesSongs.find((iTrack) => {
                const iTitle = normalize(iTrack.title);
                return (
                  iTitle.length > 3 &&
                  (iTitle.includes(dTitle) || dTitle.includes(iTitle))
                );
              });
            }

            // 3. Fallback to matching by track index if no name match was found
            if (!match && index < itunesSongs.length) {
              match = itunesSongs[index];
            }
            preview = match ? match.previewUrl : null;
          }
          return { title: dTrack.title, previewUrl: preview };
        });
      } else if (itunesSongs && itunesSongs.length > 0) {
        // Fallback: If Discogs has no tracklist at all, just display the iTunes tracks
        mergedSongs = itunesSongs;
      }

      if (mergedSongs.length > 0) {
        setSongs(mergedSongs);
      } else {
        setSongs([{ title: "No tracklist available" }]);
      }
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setSongs([{ title: "Failed to load tracklist" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (props.autoOpen && songs.length === 0) {
      loadTracks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoOpen]);

  const handleAlbumClick = async (e) => {
    // Prevent toggling the tracklist if the user clicks the external link
    if (e && e.target && e.target.closest("a")) return;

    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    // Pause any playing audio if the tracklist gets closed
    if (!nextIsOpen && audioRef.current) {
      audioRef.current.pause();
      setPlayingIndex(null);
    }

    // Fetch songs only when opening, and only if they haven't been fetched yet
    if (nextIsOpen && songs.length === 0) {
      await loadTracks();
    }
  };

  // Listen for other albums starting playback to pause this one
  useEffect(() => {
    const handleGlobalPlay = (e) => {
      if (playingIndex !== null && e.detail !== audioRef.current) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setPlayingIndex(null);
      }
    };

    window.addEventListener("audioPlayed", handleGlobalPlay);
    return () => window.removeEventListener("audioPlayed", handleGlobalPlay);
  }, [playingIndex]);

  const handlePlayClick = (index, url) => {
    if (!url) return;

    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      window.dispatchEvent(new CustomEvent("audioPlayed", { detail: audioRef.current }));
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingIndex(index);
    }
  };

  const handleTrackEnd = () => {
    if (playingIndex === null) return;

    // Find the next available song that has an audio preview
    let nextIndex = playingIndex + 1;
    while (nextIndex < songs.length && !songs[nextIndex].previewUrl) {
      nextIndex++;
    }

    if (nextIndex < songs.length) {
      window.dispatchEvent(new CustomEvent("audioPlayed", { detail: audioRef.current }));
      audioRef.current.src = songs[nextIndex].previewUrl;
      audioRef.current.play();
      setPlayingIndex(nextIndex);
    } else {
      setPlayingIndex(null); // Stop playing if it was the last song
    }
  };

  return (
    <div className="albumContainer">
      <div
        className={`album ${isOpen ? "open" : ""}`}
        onClick={handleAlbumClick}
        style={{ cursor: "pointer" }}
      >
        <div className="albumInfoContainer">
          <div className="img">
            <img src={props.cover} alt="" />
          </div>
          <ul>
            <li>
              <h3>
                {" "}
                <strong>{props.title}</strong>
              </h3>
            </li>
            <li>
              <h3> {props.artist}</h3>
            </li>
            <li>
              <h2> {props.year}</h2>
            </li>
          </ul>
        </div>
        <a href={props.rymLink} target="_blank" rel="noopener noreferrer">
          <div></div>
        </a>

        {/* Tracklist Dropdown */}
      </div>
      {isOpen && (
        <div className="albumDetails">
          <AlbumTracklist
            isLoading={isLoading}
            songs={songs}
            playingIndex={playingIndex}
            handlePlayClick={handlePlayClick}
            audioRef={audioRef}
            setPlayingIndex={setPlayingIndex}
            handleTrackEnd={handleTrackEnd}
          />
          <div className="recordPlayerWrapper">
            <RecordPlayerAsset cover={props.cover} isPlaying={playingIndex !== null} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
