import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import {
  loadCases,
  selectCases,
  selectCasesError,
  selectCasesFilters,
  selectCasesPagination,
  selectCasesStatus,
  setFilters,
  setLimit,
  setPage,
} from "../casesSlice.js";

function toInt(value, fallback) {
  const n = parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function normalizeState(v) {
  const allowed = new Set([
    "all",
    "open",
    "in_progress",
    "resolved",
    "waiting_customer",
  ]);
  return allowed.has(v) ? v : "all";
}

function normalizeSeverity(v) {
  const allowed = new Set(["all", "low", "medium", "high", "critical"]);
  return allowed.has(v) ? v : "all";
}

export default function useCasesPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const didInit = useRef(false);

  const items = useSelector(selectCases);
  const status = useSelector(selectCasesStatus);
  const error = useSelector(selectCasesError);

  const filters = useSelector(selectCasesFilters);
  const pagination = useSelector(selectCasesPagination);

  useEffect(() => {
    if (didInit.current) return;

    const urlPage = toInt(searchParams.get("page"), 1);
    const urlLimit = toInt(searchParams.get("limit"), 10);

    const urlState = normalizeState(searchParams.get("state") || "all");
    const urlSeverity = normalizeSeverity(
      searchParams.get("severity") || "all",
    );
    const urlQ = searchParams.get("q") || "";

    dispatch(setPage(urlPage));
    dispatch(setLimit(urlLimit));
    dispatch(setFilters({ state: urlState, severity: urlSeverity, q: urlQ }));

    didInit.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!didInit.current) return;

    const next = new URLSearchParams();
    next.set("page", String(pagination.page));
    next.set("limit", String(pagination.limit));

    if (filters.state !== "all") next.set("state", filters.state);
    if (filters.severity !== "all") next.set("severity", filters.severity);
    if (filters.q) next.set("q", filters.q);

    setSearchParams(next, { replace: true });
  }, [
    filters.state,
    filters.severity,
    filters.q,
    pagination.page,
    pagination.limit,
    setSearchParams,
  ]);

  useEffect(() => {
    dispatch(loadCases());
  }, [
    dispatch,
    filters.state,
    filters.severity,
    filters.q,
    pagination.page,
    pagination.limit,
  ]);

  const isLoading = status === "loading";

  const headerText = useMemo(
    () => `Cases (${pagination.totalItems})`,
    [pagination.totalItems],
  );

  return {
    items,
    status,
    error,
    filters,
    pagination,

    isLoading,
    headerText,

    refresh: () => dispatch(loadCases()),
    onPageChange: (p) => dispatch(setPage(p)),
  };
}
