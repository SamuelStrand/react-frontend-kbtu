import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemsSlice';
import ItemsList from '../components/ItemsList';

export default function ItemsPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { list, loadingList, errorList } = useSelector(
    (state) => state.items,
  );

  useEffect(() => {
    dispatch(fetchItems(query));
  }, [query, dispatch]);

  const handleQueryChange = (value) => {
    const next = value.trim() ? { q: value } : {};
    setSearchParams(next, { replace: true });
  };

  return (
    <ItemsList
      query={query}
      onQueryChange={handleQueryChange}
      items={list}
      loading={loadingList}
      error={errorList}
    />
  );
}
