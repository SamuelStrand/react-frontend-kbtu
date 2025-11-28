import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItemById,
  clearSelectedItem,
} from '../features/items/itemsSlice';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import './ItemDetails.css';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedItem: item,
    loadingItem,
    errorItem,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItemById(id));

    return () => {
      dispatch(clearSelectedItem());
    };
  }, [id, dispatch]);

  const renderContent = () => {
    if (loadingItem) {
      return (
        <div className="itemDetails__state">
          <Spinner label="Loading game" />
        </div>
      );
    }

    if (errorItem) {
      return <ErrorBox>Failed to load game: {errorItem}</ErrorBox>;
    }

    if (!loadingItem && !errorItem && !item) {
      return <p className="itemDetails__empty">Game not found.</p>;
    }

    if (!item) {
      return null;
    }

    return (
      <article className="itemDetails__card">
        <div className="itemDetails__media">
          <img
            src={item.thumbnail}
            alt={`${item.title} thumbnail`}
            className="itemDetails__image"
          />
          {item.screenshots?.length ? (
            <div className="itemDetails__screens">
              {item.screenshots.slice(0, 3).map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt={`${item.title} screenshot ${screenshot.id}`}
                  loading="lazy"
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="itemDetails__info">
          <h1 className="itemDetails__title">{item.title}</h1>
          <p className="itemDetails__description">{item.description}</p>
          <dl className="itemDetails__meta">
            <div>
              <dt>Genre</dt>
              <dd>{item.genre}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{item.platform}</dd>
            </div>
            <div>
              <dt>Publisher</dt>
              <dd>{item.publisher}</dd>
            </div>
            <div>
              <dt>Developer</dt>
              <dd>{item.developer}</dd>
            </div>
            <div>
              <dt>Release date</dt>
              <dd>{item.release_date}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{item.status}</dd>
            </div>
            <div>
              <dt>Official website</dt>
              <dd>
                <a href={item.game_url} target="_blank" rel="noreferrer">
                  Visit website
                </a>
              </dd>
            </div>
          </dl>
          {item.minimum_system_requirements ? (
            <section className="itemDetails__requirements">
              <h2>Minimum system requirements</h2>
              <ul>
                {Object.entries(
                  item.minimum_system_requirements,
                ).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    );
  };

  return (
    <section className="itemDetails">
      <button
        type="button"
        className="itemDetails__back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      {renderContent()}
    </section>
  );
}
