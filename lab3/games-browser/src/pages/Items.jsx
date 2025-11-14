import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemsList from '../components/ItemsList';

export default function ItemsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';

    const handleQueryChange = value => {
        const next = value.trim() ? { q: value } : {};
        setSearchParams(next, { replace: true });
    };

    return (
        <ItemsList query={query} onQueryChange={handleQueryChange} />
    );
}
