import React from 'react';
import '../styles/gameCard.css';

export default function GameCard({ game }) {
    return (
        <li className="gameCard">
            <img
                className="gameCard__thumb"
                src={game.thumbnail}
                alt={`${game.title} thumbnail`}
                loading="lazy"
            />
            <div className="gameCard__body">
                <h3 className="gameCard__title">{game.title}</h3>
                <p className="gameCard__desc">{game.short_description}</p>
                <div className="gameCard__meta">
                    <span>{game.genre}</span>
                    <span>•</span>
                    <span>{game.platform}</span>
                    <span>•</span>
                    <time dateTime={game.release_date}>{game.release_date}</time>
                </div>
                <a className="gameCard__link" href={game.game_url} target="_blank" rel="noreferrer">
                    Play
                </a>
            </div>
        </li>
    );
}
