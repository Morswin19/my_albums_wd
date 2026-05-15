const DISCOGS_TOKEN = process.env.REACT_APP_DISCOGS_TOKEN;
const API_URL = process.env.REACT_APP_DISCOGS_API_URL
const CACHE_KEY = 'discogs_collection_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const fetchDiscogsCollection = async () => {
  // 1. Check if we have valid cached data
  // const cached = localStorage.getItem(CACHE_KEY);
  const cached = false
  if (cached) {
    try {
      const parsedCache = JSON.parse(cached);
      if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
        console.log('Loaded Discogs collection from cache');
        return parsedCache.data;
      }
    } catch (e) {
      console.error("Failed to parse cache", e);
    }
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Discogs token=${DISCOGS_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data)
    
    // Map the Discogs release array concurrently for faster loading.
    const mappedReleases = await Promise.all(
      data.releases.map(async (item) => {
        let releaseYear = item.basic_information.year?.toString();
        const masterId = item.basic_information.master_id;

        // If a master_id exists and the release year is missing or '0', fetch the master release to get the original year
        if (masterId && (!releaseYear || releaseYear === '0')) {
          try {
            const masterResponse = await fetch(`https://api.discogs.com/masters/${masterId}`, {
              headers: { Authorization: `Discogs token=${DISCOGS_TOKEN}` },
            });
            if (masterResponse.ok) {
              const masterData = await masterResponse.json();
              releaseYear = masterData.year?.toString() || releaseYear;
            }
          } catch (masterError) {
            console.error(`Failed to fetch master info for master_id ${masterId}:`, masterError);
          }
        }

        return {
          id: item.id,
          title: item.basic_information.title,
          artist: item.basic_information.artists[0]?.name?.replace(/\s\(\d+\)$/, ''),
          year: releaseYear || '',
          photoLinkSmall: item.basic_information.thumb,
          rymLink: '',
        };
      })
    );

    // 2. Save the successful result to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: mappedReleases
    }));

    return mappedReleases;
  } catch (error) {
    console.error("Failed to fetch collection from Discogs:", error);
    
    // 3. Fallback to expired cache if network totally fails
    if (cached) {
      console.log('Network failed, falling back to expired cache');
      return JSON.parse(cached).data;
    }

    return []; // Return empty array as fallback
  }
};

export const fetchAlbumTracklist = async (releaseId) => {
  try {
    const response = await fetch(`https://api.discogs.com/releases/${releaseId}`, {
      headers: {
        'Authorization': `Discogs token=${DISCOGS_TOKEN}`,
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    let tracklist = data.tracklist || [];

    // If the specific release has no tracklist, try to fetch the master release tracklist
    if (tracklist.length === 0 && data.master_id) {
      try {
        const masterResponse = await fetch(`https://api.discogs.com/masters/${data.master_id}`, {
          headers: { 'Authorization': `Discogs token=${DISCOGS_TOKEN}` }
        });
        if (masterResponse.ok) {
          const masterData = await masterResponse.json();
          tracklist = masterData.tracklist || [];
        }
      } catch (masterError) {
        console.error(`Failed to fetch master tracklist for master_id ${data.master_id}:`, masterError);
      }
    }
    
    return tracklist.map(track => ({
      title: track.title,
      previewUrl: null
    }));
  } catch (error) {
    console.error(`Failed to fetch tracklist for release ${releaseId}:`, error);
    return [];
  }
};