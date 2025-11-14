import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/itemCard.css';

export default function ItemCard({ item }) {
  return (
    <li className="itemCard">
      <img className="itemCard__thumb" src={item.thumbnail} alt={item.title} loading="lazy" />
      <div className="itemCard__body">
        <h3 className="itemCard__title">
          <Link to={`/items/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="itemCard__desc">{item.short_description}</p>
        <div className="itemCard__meta">
          <span>{item.genre}</span><span>•</span>
          <span>{item.platform}</span>
        </div>
      </div>
    </li>
  );
}
