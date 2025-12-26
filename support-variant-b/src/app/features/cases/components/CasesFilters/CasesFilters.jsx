import "./CasesFilters.css";
import Card from "../../../../../ui/Card/Card.jsx";
import Row from "../../../../../ui/Row/Row.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectCasesFilters,
  setFilters,
} from "../../casesSlice.js";
import Button from "../../../../../ui/Button/Button.jsx";

export default function CasesFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectCasesFilters);

  return (
    <Card>
      <Row gap={8}>
        <select
          className="select"
          value={filters.state}
          onChange={(e) => dispatch(setFilters({ state: e.target.value }))}
          aria-label="Status"
        >
          <option value="all">All states</option>
          <option value="open">Opened</option>
          <option value="in_progres">In Progress</option>
          <option value="waiting_customers">Waiting Customer</option>
          <option value="resolveed">Resolved</option>
        </select>
        <select
          className="select"
          value={filters.severity}
          onChange={(e) => dispatch(setFilters({ severity: e.target.value }))}
          aria-label="Status"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <input
          className="input search"
          placeholder="Search…"
          value={filters.q}
          onChange={(e) => dispatch(setFilters({ q: e.target.value }))}
          aria-label="Search"
        />

        <Button onClick={() => dispatch(resetFilters())}>Reset</Button>
      </Row>
    </Card>
  );
}
