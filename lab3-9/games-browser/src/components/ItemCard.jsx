import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';

export default function ItemCard({ item }) {
    return (
        <li className="itemCard">
            <img
                className="itemCard__thumb"
                src={item.thumbnail}
                alt={`${item.title} thumbnail`}
                loading="lazy"
            />
            <div className="itemCard__body">
                <h3 className="itemCard__title">{item.title}</h3>
                <p className="itemCard__desc">{item.short_description}</p>
                <div className="itemCard__meta">
                    <span>{item.genre}</span>
                    <span aria-hidden="true">•</span>
                    <span>{item.platform}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={item.release_date}>{item.release_date}</time>
                </div>
                <Link className="itemCard__link" to={`/items/${item.id}`}>
                    View details
                </Link>
            </div>
        </li>
    );
}
