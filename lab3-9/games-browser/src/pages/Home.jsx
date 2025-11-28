import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="home">
            <div className="home__content">
                <h1 className="home__title">Discover your next favorite free game</h1>
                <p className="home__text">
                    Game Explorer brings together the best free-to-play PC titles. Browse hundreds of games, filter by your favourite genres, and open each card to learn more about the story, platform, and reviews.
                </p>
                <p className="home__text">
                    Jump to the <Link to="/items">games catalog</Link> or read about how this project was built on the <Link to="/about">about page</Link>.
                </p>
            </div>
            <div className="home__media">
                <img
                    src="https://media.istockphoto.com/id/1399812399/photo/happy-asia-man-gamer-wear-headphone-competition-play-video-game-online-with-smartphone.jpg?s=2048x2048&w=is&k=20&c=XLopzi80vdlg_nA18_s0dhQcB2LQhj9H3khf0a-aP_8="
                    alt="Person holding a game controller"
                    className="home__image"
                />
            </div>
        </section>
    );
}
