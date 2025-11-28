import React from 'react';
import './About.css';

export default function About() {
    return (
        <section className="about">
            <h1>About Game Explorer</h1>
            <p>
                This project was built as part of the React labs course to practice working with REST APIs, reusable UI components, and client-side routing.
            </p>
            <p>
                The catalog is powered by the <a href="https://www.freetogame.com/api-doc" target="_blank" rel="noreferrer">FreeToGame API</a>. Each card opens a detail page where you can inspect screenshots, requirements, and extra metadata provided by the service.
            </p>
            <p>
                Under the hood, the app uses Vite, React 19 and React Router 7. Data fetching is encapsulated in a dedicated service module, making it easy to swap the backend in future assignments.
            </p>
        </section>
    );
}
