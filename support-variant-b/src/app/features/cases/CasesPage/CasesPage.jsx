import "./CasesPage.css";
import { Link, useLocation } from "react-router";

import useCasesPage from "../hooks/useCasesPage.js";
import Loader from "../../../../ui/Loader/Loader.jsx";
import CasesFilters from "../components/CasesFilters/CasesFilters.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";

import Card from "../../../../ui/Card/Card";
import Row from "../../../../ui/Row/Row";
import Button from "../../../../ui/Button/Button";
import ErrorBox from "../../../../ui/ErrorBox/ErrorBox";

export default function CasesPage() {
  const location = useLocation();
  const {
    items,
    status,
    error,
    pagination,
    isLoading,
    headerText,
    refresh,
    onPageChange,
  } = useCasesPage();

  return (
      <Card>
        {isLoading && <Loader text="Loading cases…" />}

        <Row justify="space-between" wrap>
          <h1 className="h1 title">{headerText}</h1>

          <Button onClick={refresh} disabled={isLoading}>
            Refresh
          </Button>
        </Row>

        <div className="section">
          <CasesFilters />
        </div>

        {status === "failed" && (
            <div className="section">
              <ErrorBox status="error" title="Failed to load cases">
                {String(error || "")}
              </ErrorBox>
            </div>
        )}

        <div className="section">
          <table className="table">
            <thead>
            <tr>
              <th className="col-id">ID</th>
              <th>Title</th>
              <th className="col-state">State</th>
              <th className="col-severity">Severity</th>
              <th className="col-updated">Updated</th>
              <th className="col-actions" />
            </tr>
            </thead>

            <tbody>
            {!isLoading && items.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty">
                    No cases found.
                  </td>
                </tr>
            )}

            {!isLoading &&
                items.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>

                      <td>
                        <div className="itemTitle">{c.title}</div>
                        <div className="itemDesc">
                          {(c.description || "").slice(0, 90)}
                          {(c.description || "").length > 90 ? "…" : ""}
                        </div>
                      </td>

                      <td>
                    <span className="badge">
                      {c.state === "in_progress" ? "in progress" : c.state}
                    </span>
                      </td>

                      <td>
                        <span className="badge">{c.severity}</span>
                      </td>

                      <td className="muted">
                        {c.updatedAt ? new Date(c.updatedAt).toLocaleString() : "—"}
                      </td>

                      <td className="actions">
                        <Link
                            to={`/cases/${c.id}${location.search || ""}`}
                            className="linkBtn"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                ))}
            </tbody>
          </table>

          <div className="pagination">
            <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
                disabled={isLoading}
            />
          </div>
        </div>
      </Card>
  );
}
