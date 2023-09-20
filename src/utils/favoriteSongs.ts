import {SongRating} from "../pages/PlayPage";

export function saveRatedSongs(ratedSongs: SongRating[]) {
    localStorage.setItem('ratedSongs', JSON.stringify(ratedSongs));
}

export function getRatedSongs() {
    return JSON.parse(localStorage.getItem('ratedSongs') ?? '[]') as SongRating[];
}

export function rateSong(songId: string, liked: boolean) {
    const ratedSongs = getRatedSongs();
    ratedSongs.push({songId, liked});
    saveRatedSongs(ratedSongs);
}

export function unlikeSong(songId: string) {
    const ratedSongs = getRatedSongs();
    const index = ratedSongs.findIndex(ratedSong => ratedSong.songId === songId);
    if (index !== -1)
        ratedSongs[index].liked = false;
    saveRatedSongs(ratedSongs);
}