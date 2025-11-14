import '../styles/details.css';

export default function ItemDetails(){
  // ... твоя логика загрузки остаётся прежней

  return (
    <article className="details">
      <div className="details__topbar">
        <button onClick={() => navigate(-1)} className="button">← Back</button>
        <Link to="/items" className="button">All items</Link>
      </div>

      <div className="details__hero">
        <div className="details__media">
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="details__content">
          <h1 className="details__title">{item.title}</h1>

          <div className="details__badges">
            {item.genre && <span className="badge">{item.genre}</span>}
            {item.platform && <span className="badge">{item.platform}</span>}
            {item.release_date && <span className="badge">Released: {item.release_date}</span>}
          </div>

          {item.short_description && (
            <p className="details__desc">{item.short_description}</p>
          )}

          <div className="details__grid">
            {item.developer && (
              <div className="details__infocard">
                <div className="details__label">Developer</div>
                <div className="details__value">{item.developer}</div>
              </div>
            )}
            {item.publisher && (
              <div className="details__infocard">
                <div className="details__label">Publisher</div>
                <div className="details__value">{item.publisher}</div>
              </div>
            )}
          </div>

          <div className="details__actions">
            {item.game_url && <a className="btn-primary" href={item.game_url} target="_blank" rel="noreferrer">Official site</a>}
            {item.freetogame_profile_url && <a className="btn-outline" href={item.freetogame_profile_url} target="_blank" rel="noreferrer">Profile</a>}
          </div>
        </div>
      </div>

      {item.description && (
        <section className="details__long">
          <h2>Description</h2>
          <p>{item.description}</p>
        </section>
      )}
    </article>
  );
}
