const sessionStore: {
  songID: string;
  liked: boolean;
}[] = [];

// Save liked song with date and time and save to localStorage and SessionStorage
function addSong(songID: string, liked: boolean) {
  const date = new Date();
  const ratedSongs = JSON.parse(localStorage.getItem('ratedSongs') || '[]');
  ratedSongs.push({ songID, liked, date });
  localStorage.setItem('likedSongs', JSON.stringify(ratedSongs));
  sessionStore.push({ songID, liked });
}

// remove song from localStorage
function deleteSong(songID: string) {
  const ratedSongs = JSON.parse(localStorage.getItem('ratedSongs') || '[]');
  const newRatedSongs = ratedSongs.filter((song: { songID: string }) => song.songID !== songID);
  localStorage.setItem('likedSongs', JSON.stringify(newRatedSongs));
}

//return sorted LocalStorage
function getSortedLikes() {
  const ratedSongs = JSON.parse(localStorage.getItem('ratedSongs') || '[]');
  const likedSongs = ratedSongs.filter((song: { liked: boolean }) => song.liked);
  const newLikedSongs = likedSongs.sort((a: { date: number }, b: { date: number }) => b.date - a.date);
  return newLikedSongs;
}
