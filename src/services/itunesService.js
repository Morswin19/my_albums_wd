export const fetchITunesAlbumTracks = async (albumTitle, artistName) => {
  try {
    // 1. Search for the album using title and artist
    // Discogs often adds "(Remastered)" or "[Bonus Tracks]" to titles, which breaks exact iTunes matches.
    // This regex strips anything inside parentheses or brackets.
    const cleanTitle = albumTitle.replace(/\s*[([].*?[)\]]\s*/g, ' ').trim();
    
    // The iTunes API prefers '+' for spaces instead of standard '%20'
    const formatQuery = (str) => encodeURIComponent(str).replace(/%20/g, '+');
    
    // Extract significant words to ensure we don't accidentally grab a "Greatest Hits" or "Live" album
    const getSignificantWords = (title) => {
      const words = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);
      const stopWords = ['the', 'a', 'an', 'of', 'and', 'in', 'on', 'to', 'for', 'with', 'is', 'at', 'by', 'from'];
      const significant = words.filter(w => !stopWords.includes(w));
      return significant.length > 0 ? significant : words;
    };
    const targetWords = getSignificantWords(cleanTitle);

    // Normalize target artist for comparison
    const targetArtistNormalized = artistName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Helper function to extract tracks from a list of iTunes results
    const getTracksFromResults = async (results) => {
      for (let i = 0; i < results.length; i++) {
        const albumId = results[i].collectionId;
        const collectionName = results[i].collectionName || 'Unknown Album';
        const resultArtist = results[i].artistName || 'Unknown Artist';
        
        // Check if the artist matches
        const fetchedArtistNormalized = resultArtist.toLowerCase().replace(/[^a-z0-9]/g, '');
        const hasArtistMatch = targetArtistNormalized === '' || 
                               fetchedArtistNormalized === targetArtistNormalized ||
                               (targetArtistNormalized.length > 3 && fetchedArtistNormalized.includes(targetArtistNormalized)) || 
                               (fetchedArtistNormalized.length > 3 && targetArtistNormalized.includes(fetchedArtistNormalized));
        
        if (!hasArtistMatch) continue;

        const resultWords = collectionName.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
        const hasWordMatch = targetWords.length === 0 || targetWords.some(w => 
            resultWords.some(rw => 
                w === rw || 
                (rw.length > 3 && w.includes(rw)) || 
                (w.length > 3 && rw.includes(w))
            )
        );
        
        if (!hasWordMatch) continue;

        const tracksUrl = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
        const tracksResponse = await fetch(tracksUrl);
        const tracksData = await tracksResponse.json();
        
        const tracks = tracksData.results.filter(item => item.wrapperType === 'track');
        if (tracks.length > 0) return tracks;
      }
      return null;
    };

    // 1. Initial Search
    let searchQuery = formatQuery(`${cleanTitle} ${artistName}`);
    let searchResponse = await fetch(`https://itunes.apple.com/search?term=${searchQuery}&entity=album&limit=25`);
    let searchData = await searchResponse.json();
    let tracks = await getTracksFromResults(searchData.results);
    
    // 2. Fallback 1: Remove special characters
    if (!tracks) {
      const alphaTitle = cleanTitle.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
      const alphaQuery = formatQuery(`${alphaTitle} ${artistName}`);
      searchResponse = await fetch(`https://itunes.apple.com/search?term=${alphaQuery}&entity=album&limit=25`);
      searchData = await searchResponse.json();
      tracks = await getTracksFromResults(searchData.results);
    }
    
    // 3. Fallback 2: First word only
    if (!tracks) {
      const firstWordOfTitle = cleanTitle.split(/[^a-zA-Z0-9]/)[0];
      if (firstWordOfTitle.length > 1) {
        const fallbackQuery = formatQuery(`${firstWordOfTitle} ${artistName}`);
        searchResponse = await fetch(`https://itunes.apple.com/search?term=${fallbackQuery}&entity=album&limit=25`);
        searchData = await searchResponse.json();
        tracks = await getTracksFromResults(searchData.results);
      }
    }
    
    // 4. Fallback 3: Song Search
    if (!tracks) {
      const songQuery = formatQuery(`${cleanTitle} ${artistName}`);
      searchResponse = await fetch(`https://itunes.apple.com/search?term=${songQuery}&entity=song&limit=15`);
      searchData = await searchResponse.json();
      tracks = await getTracksFromResults(searchData.results);
    }
    
    if (!tracks) return null;
    
    return tracks.map(track => ({
      title: track.trackName,
      previewUrl: track.previewUrl // iTunes natively provides 30s previews here
    }));
  } catch (error) {
    console.error("iTunes API error:", error);
    return null;
  }
};