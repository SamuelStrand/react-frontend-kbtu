import "./styles.css";

export default function App() {
    return (
        <div className="container">
            <header className="header">
                <div className="brand">
                    <div className="logo" aria-label="Logo">AU</div>
                    <h1 className="title">About us</h1>
                </div>
                <a href="https://github.com/samuelstrand" target="_blank" rel="noreferrer">GitHub</a>
            </header>

            <section className="card" style={{ marginBottom: 12 }}>
                <p style={{ margin: 0 }}>
                    Here's the page About Us, where you can find all the info
                </p>
            </section>

            <section className="grid cols-2" style={{ marginBottom: 12 }}>
                <div className="card">
                    <h2 className="section-title">Our mission</h2>
                    <p style={{ margin: 0 }}>
                        To study react and pass it with A grade (hopefully) and to develop
                        the coolest frontend applications
                    </p>
                </div>

                <div className="card">
                    <h2 className="section-title">Contacts</h2>
                    <div className="contact-list">
                        <div className="contact-item">
                            <strong>Email</strong>
                            <a href="mailto:emil@example.com">emil@example.com</a>
                        </div>
                        <div className="contact-item">
                            <strong>Telegram</strong>
                            <a href="https://t.me/emil" target="_blank" rel="noreferrer">@emil</a>
                        </div>
                        <div className="contact-item">
                            <strong>GitHub</strong>
                            <a href="https://github.com/samuelstrand" target="_blank" rel="noreferrer">
                                github.com/samuelstrand
                            </a>
                        </div>
                    </div>
                    <p style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
                        Public channels only. No private addresses or sensitive data.
                    </p>
                </div>
            </section>

            <section className="card">
                <h2 className="section-title">Team</h2>
                <div className="team-list">
                    <div className="member">
                        <div className="avatar">EK</div>
                        <div>
                            <p className="member-name">Emil K</p>
                            <p className="member-role">Frontend Developer — builds UI, improves accessibility, and keeps components simple.</p>
                        </div>
                    </div>
                    <div className="member">
                        <div className="avatar">SF</div>
                        <div>
                            <p className="member-name">Some Friend</p>
                            <p className="member-role">Backend Developer — designs APIs, ensures performance, and maintains clean data flow.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <span>© {new Date().getFullYear()} Emil K</span>
                <span>React • JSX</span>
            </footer>
        </div>
    );
}
