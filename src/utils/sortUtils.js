export const sortAlbumsByArtist = (albums) => {
  if (!albums || !Array.isArray(albums)) return [];

  return [...albums].sort((a, b) => {
    const artistA = (a.artist || "").toLowerCase();
    const artistB = (b.artist || "").toLowerCase();

    if (artistA < artistB) return -1;
    if (artistA > artistB) return 1;

    // If artists are the same, sort by year (oldest first)
    const yearA = parseInt(a.year || 0, 10);
    const yearB = parseInt(b.year || 0, 10);

    return yearA - yearB;
  });
};
