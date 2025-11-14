const API_BASE = '/ftg';

const parseJson = async response => {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

async function request(path, { signal } = {}) {
    const response = await fetch(`${API_BASE}${path}`, { signal });

    if (response.status === 404) {
        return { notFound: true };
    }

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return { data: await parseJson(response) };
}

export async function getAll({ signal } = {}) {
    const { data } = await request('/games?platform=pc', { signal });
    return Array.isArray(data) ? data : [];
}

export async function getById(id, { signal } = {}) {
    if (!id) {
        throw new Error('Missing id');
    }

    const { data, notFound } = await request(`/game?id=${encodeURIComponent(id)}`, { signal });

    if (notFound) {
        return null;
    }

    return data;
}

export default {
    getAll,
    getById,
};
