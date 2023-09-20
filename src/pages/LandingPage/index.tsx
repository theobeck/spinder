import Platespiller from '../../assets/Platespiller.png';
import Phones from '../../assets/phones.png';
import SwipePic from '../../assets/swipePic.png';
import SongList from '../../assets/Song list.png';
import Album from '../../assets/album.png';
import './index.css';
import React from 'react';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import {SpotifyAPI, storeAuthorization} from "../../utils/authentication.ts";

export default function LandingPage() {
  const login_url =
    'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=0f37263f16274f449f2bdf87c132937f' +
    '&scope=' +
    encodeURIComponent('user-read-private user-read-email') +
    '&redirect_uri=' +
    encodeURIComponent(window.location.host === "it2810-13.idi.ntnu.no" ?
        "http://it2810-13.idi.ntnu.no/project1/callback" :
        "http://localhost:5173/callback") +
    '&show_dialog=true';

  function dummy_sign_in() {
    storeAuthorization(SpotifyAPI.getDummyAuthorization());
    window.location.href = window.location.href.replace(/\/[^/]*$/, '');
  }

  return (
    <>
      <div id="main" className="m-null">
        <nav id='navBar' className="flex relative sp-b">
          <div className="flex">
            <img id='logo' src={Platespiller} alt="logo" height="50vh" />
            <h1 className='header'>Spinder</h1>
          </div>

          <div>
            <Link id="log-in" to={login_url}>
              Log in
            </Link>
            <a id="dummy-log-in" onClick={dummy_sign_in}>
                Bruk som gjest
            </a>
          </div>
        </nav>

        <div className="flex sp-a ">
          <div id="phones">
            <img id="phonePic" src={Phones} alt="phones" height="447vh" />
          </div>

          <div id="slogan" className="relative flex">
            <div id="textbox">
              <a className='links' href="#swipe">Swipe</a>
              <p className='text'>millions of different songs</p>
              <a className='links' href="#create">Create</a>
              <p className='text'>playlists based on all your taste</p>
              <a className='links' href="#discover">Discover</a>
              <p className='text'>new songs along the way!</p>
            </div>

            <div id="filler1"></div>

            <div id="filler2"></div>
          </div>
        </div>
      </div>

      <div id="swipe" className="m-null">
        <div id="swipeHead" className='swipeDiv'>
          <h1 className="m-null p90 pt-25 header">Swipe</h1>
        </div>

        <div className="flex sp-a swipeDiv">
          <div id="swipePic">
            <img id="swipe" src={SwipePic} alt="swipe example" />
          </div>

          <div id="swipeText" className='swipeDiv'>
            <p className="m-null p20 text">
              Spotify's vast library and give your favorite songs the recognition they deserve. Swipe right if you love
              it, left if you don't, and create your unique music ranking.
            </p>
          </div>
        </div>
      </div>

      <div id="create" className="m-null">
        <div className="flex sp-a">
          <div id="createText">
            <h1 className="m-null p90 pt-25 pb-10 header">Create</h1>
            <p className="m-null p20 text">
              a personalized playlist tailored to your musical taste. Our intuitive platform analyzes your ranked songs
              to help you curate the perfect playlist, making your listening experience a little more personal and
              special.
            </p>
          </div>
          <div id="album">
            <img id='songs' src={SongList} alt="songs" height="690vh" />
          </div>
        </div>
      </div>

      <div id="discover">
        <h1 className="m-null p90 pt-25 header">Discover</h1>
        <div className="flex sp-a">
          <img id='albums' src={Album} alt="albums" height="590vh" />
          <p className="m-null p20 text">
            hidden gems and uncover the latest hits from Spotify's extensive music catalog. Our algorithm uses your
            preferences to recommend new songs and artists you're sure to adore
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
