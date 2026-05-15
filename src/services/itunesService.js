export const fetchITunesAlbumTracks = async (albumTitle, artistName) => {
  try {
    // 1. Search for the album using title and artist
    // Discogs often adds "(Remastered)" or "[Bonus Tracks]" to titles, which breaks exact iTunes matches.
    // This regex strips anything inside parentheses or brackets.
    const cleanTitle = albumTitle.replace(/\s*[([].*?[)\]]\s*/g, ' ').trim();
    
    // The iTunes API prefers '+' for spaces instead of standard '%20'
    const formatQuery = (str) => encodeURIComponent(str).replace(/%20/g, '+');
    
    let searchQuery = formatQuery(`${cleanTitle} ${artistName}`);
    let searchUrl = `https://itunes.apple.com/search?term=${searchQuery}&entity=album&limit=5`;
    
    let searchResponse = await fetch(searchUrl);
    let searchData = await searchResponse.json();
    
    // Fallback 1: Remove special characters (hyphens, quotes) that might break exact matching
    if (searchData.resultCount === 0) {
      const alphaTitle = cleanTitle.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      const alphaQuery = formatQuery(`${alphaTitle} ${artistName}`);
      const fallback1Url = `https://itunes.apple.com/search?term=${alphaQuery}&entity=album&limit=5`;
      searchResponse = await fetch(fallback1Url);
      searchData = await searchResponse.json();
    }
    
    // Fallback 2: Looser search using just the first word of the album title + artist
    if (searchData.resultCount === 0) {
      const firstWordOfTitle = cleanTitle.split(/[^a-zA-Z0-9]/)[0]; // Gets the very first actual word
      if (firstWordOfTitle.length > 1) { // Only fallback if word is meaningful
        const fallbackQuery = formatQuery(`${firstWordOfTitle} ${artistName}`);
        const fallback2Url = `https://itunes.apple.com/search?term=${fallbackQuery}&entity=album&limit=10`;
        searchResponse = await fetch(fallback2Url);
        searchData = await searchResponse.json();
      }
    }
    
    // Fallback 3: iTunes album search is sometimes too strict. 
    // Let's search for a single song matching the artist and album instead!
    if (searchData.resultCount === 0) {
      const songQuery = formatQuery(`${cleanTitle} ${artistName}`);
      const fallback3Url = `https://itunes.apple.com/search?term=${songQuery}&entity=song&limit=1`;
      searchResponse = await fetch(fallback3Url);
      searchData = await searchResponse.json();
    }
    
    if (searchData.resultCount === 0) {
      return null; // Album not found on Apple Music
    }
    
    let tracks = [];
    
    // 2. Iterate through found albums and get the tracks. 
    // Some iTunes albums are empty/region-locked, so we check until we find one with tracks.
    for (let i = 0; i < searchData.results.length; i++) {
      const albumId = searchData.results[i].collectionId;
      
      const tracksUrl = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
      const tracksResponse = await fetch(tracksUrl);
      const tracksData = await tracksResponse.json();
      
      // The lookup returns the album itself as the first result, so we filter only the actual tracks
      tracks = tracksData.results.filter(item => item.wrapperType === 'track');
      
      if (tracks.length > 0) {
        break; // Stop looking, we found the tracklist!
      }
    }
    
    if (tracks.length === 0) {
      return null; // Triggers Discogs fallback
    }
    
    return tracks.map(track => ({
      title: track.trackName,
      previewUrl: track.previewUrl // iTunes natively provides 30s previews here
    }));
  } catch (error) {
    console.error("iTunes API error:", error);
    return null;
  }
};