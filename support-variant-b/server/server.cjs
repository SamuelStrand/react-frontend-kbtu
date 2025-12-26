const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => setTimeout(next, 150));

server.get("/cases", (req, res) => {
  const db = router.db;
  const all = db.get("cases").value() || [];

  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const state = req.query.state; // open|in_progress|resolved|all|waiting_customer
  const severity = req.query.severity; // low|medium|high|all|critical
  const q = (req.query.q || "").toLowerCase();

  let filtered = all;

  if (state && state !== "all")
    filtered = filtered.filter((c) => c.state === state);
  if (severity && severity !== "all")
    filtered = filtered.filter((c) => c.severity === severity);

  if (q) {
    filtered = filtered.filter((c) => {
      const t = (c.title || "").toLowerCase();
      const d = (c.description || "").toLowerCase();
      return t.includes(q) || d.includes(q);
    });
  }

  const totalItems = filtered.length;
  const safeLimit = limit > 0 ? limit : totalItems || 1;
  const safePage = Math.max(1, page);
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

  const start = (safePage - 1) * safeLimit;
  const items = filtered.slice(start, start + safeLimit);

  res.json({ items, page: safePage, totalPages, totalItems });
});

server.get("/case-log", (req, res) => {
  const caseId = req.query.caseId;
  if (!caseId) return res.status(400).json({ error: "caseId is required" });

  const db = router.db;
  const logs = db.get("caseLog").value() || [];
  const items = logs
    .filter((l) => l.caseId === caseId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ items });
});

server.patch("/cases/:id", (req, res) => {
  const { id } = req.params;
  const { state, comment } = req.body;

  if (
    !["open", "in_progress", "resolved", "waiting_customer"].includes(state)
  ) {
    return res.status(400).json({ error: "Invalid state" });
  }

  const db = router.db;
  const chain = db.get("cases").find({ id });
  const existing = chain.value();

  if (!existing) {
    return res.status(404).json({ error: "Case not found" });
  }

  const fromState = existing.state;
  const nowIso = new Date().toISOString();

  const updated = chain.assign({ state, updatedAt: nowIso }).write();

  const shouldLog =
    fromState !== state || (comment && String(comment).trim().length > 0);

  if (shouldLog) {
    const logEntry = {
      id: `cl_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      caseId: id,
      action: "status_changed",
      from: fromState ?? null,
      to: state,
      note: comment ? String(comment).trim() : null,
      createdAt: nowIso,
    };

    db.get("caseLog").push(logEntry).write();
  }

  return res.json(updated);
});

server.use(router);

const PORT = 4110;
server.listen(PORT, () =>
  console.log(`Mock API running at http://localhost:${PORT}`),
);
