const API = "http://localhost:4110";

export async function fetchCases(params, { signal } = {}) {
  const usp = new URLSearchParams();

  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    const str = String(v);
    if (str.length === 0) return;
    usp.set(k, str);
  });

  const res = await fetch(`${API}/cases?${usp.toString()}`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to load cases (${res.status})`);
  }
  return res.json();
}

/**
 * GET /cases/:id
 * Returns: Case
 */
export async function fetchCaseById(caseId, { signal } = {}) {
  const res = await fetch(`${API}/cases/${encodeURIComponent(caseId)}`, {
    signal,
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("Case not found");
    throw new Error(`Failed to load case (${res.status})`);
  }
  return res.json();
}

/**
 * GET /case-log?caseId=
 * Returns: { items: CaseLog[] }
 */
export async function fetchCaseLog(caseId, { signal } = {}) {
  const res = await fetch(
    `${API}/case-log?caseId=${encodeURIComponent(caseId)}`,
    { signal },
  );
  if (!res.ok) {
    throw new Error(`Failed to load case log (${res.status})`);
  }
  return res.json();
}

/**
 * PATCH /cases/:id
 * Body: { state: "open" | "in_progress" | "resolved", comment?: string }
 * Returns: updated Case
 */
export async function patchCaseState(caseId, state, comment) {
  const body = { state };
  if (comment !== undefined) body.comment = comment;

  const res = await fetch(`${API}/cases/${encodeURIComponent(caseId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 400) {
      let msg = "Bad request";
      try {
        const data = await res.json();
        msg = data?.error || msg;
      } catch {
        throw new Error(msg);
      }
    }

    if (res.status === 404) throw new Error("Case not found");

    throw new Error(`Failed to update case (${res.status})`);
  }

  return res.json();
}
