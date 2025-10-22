import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/gameCard.css'

export default function GameCard({ game }) {
    return (
        <li className="gameCard">
            <img className="gameCard__thumb" src={game.thumbnail} alt={game.title} loading="lazy" />
            <div className="gameCard__body">
                <h3 className="gameCard__title">
                    <Link to={`/game/${game.id}`}>{game.title}</Link>
                </h3>
                <p className="gameCard__desc">{game.short_description}</p>
                <div className="gameCard__meta">
                    <span>{game.genre}</span><span>•</span>
                    <span>{game.platform}</span>
                </div>
            </div>
        </li>
    )
}
