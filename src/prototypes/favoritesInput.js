const favs = [
  {
    songName: 'CoolSong1',
    artist: 'CoolArtist1',
    img: 'smallImg.png',
  },
  {
    songName: 'CoolSong2',
    artist: 'CoolArtist2',
    img: 'smallImg.png',
  },
];

document.addEventListener('DOMContentLoaded', function () {
  let favList = document.getElementById('favorites');

  for (const item of favs) {
    const favItem = document.createElement('div');
    favItem.setAttribute('class', 'favItem');

    let songName = document.createElement('p');
    let artist = document.createElement('p');

    songName.setAttribute('class', 'songName');
    songName.textContent = item.songName;

    artist.setAttribute('class', 'artistName');
    artist.textContent = item.artist;

    favItem.appendChild(artist);
    favItem.appendChild(songName);

    favList.appendChild(favItem);
  }
});
