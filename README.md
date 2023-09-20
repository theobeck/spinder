# Spinder

Vi har laget en kombinasjon av Tinder og Spotify.
Appen lar deg raskt bla gjennom sanger og like eller dislike dem.
Sangene blir lagt til i en favoritt-liste som du kan høre på senere.

Selve designet/ utforming av sidene ble først laget i figma og i ettertid kodet over i prototyper med html og css før de ferdige sidene ble utformet.

Play siden tar inspirasjon fra fra Tinder sitt oppsett med hjerte om du liker sangen og eks om den ikke var for deg. Ut fra dine likte sanger dannes det en liste under "Favorites" hvor man kan både får en oversikt over dine likte sanger, samt slette de sangene som evt ble lagt til med uhell. Oversikten kan holdes selv når antall sanger vokser via en søkefunskjon i toppen favorites listen. Sletting av likte sanger gjøres ved å trykke på 🗙'en ved siden av sangen i listen.

Siden er utformet med tanke på bruk på både telefon-skjermer og pc-skjermer ved bruk av både av "media queries" og skalering av innhold.

Vi bruker det offisielle Spotify-apiet for å hente sanger og informasjon,
men har også laget en mock-server som kan brukes for å teste appen uten
å måtte logge inn med Spotify. Mock-API-et har følgende endpoints:

- GET /me
- GET /playlists/{playlist_id}/tracks
- GET /tracks
- GET /tracks/{track_id}

Disse følger datastrukturene til spotify-apiet:
`https://api.spotify.com/v1/me` -> `http://localhost:3000/me`
Som beskrevet her: https://developer.spotify.com/documentation/web-api
