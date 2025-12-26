import "./CaseDetails.css";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";

import {
  loadCaseById,
  loadCaseLogById,
  updateCaseState,
  selectCurrentCase,
  selectCaseDetailsError,
  selectCaseDetailsStatus,
  selectCaseLogs,
  selectCaseLogsStatus,
  selectCaseLogsError,
  selectUpdateStatus,
  selectUpdateError,
  setCurrentCaseId,
  resetChangeStatusUI,
  selectChangeUIIsChangeOpen,
  selectChangeUINextState,
  selectChangeUIComment,
  closeChangeStatus,
  openChangeStatus,
  setNextState,
  setComment,
} from "../casesSlice.js";

import Card from "../../../../ui/Card/Card";
import Row from "../../../../ui/Row/Row";
import Button from "../../../../ui/Button/Button";
import ErrorBox from "../../../../ui/ErrorBox/ErrorBox";
import Loader from "../../../../ui/Loader/Loader.jsx";
import Drawer from "../../../../ui/Drawer/Drawer.jsx";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function formatState(value) {
  if (!value) return "—";
  if (value === "in_progress") return "in progress";
  if (value === "waiting_customer") return "waiting customer";
  return String(value).replaceAll("_", " ");
}

export default function CaseDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const item = useSelector(selectCurrentCase);
  const status = useSelector(selectCaseDetailsStatus);
  const error = useSelector(selectCaseDetailsError);

  const logs = useSelector((s) => selectCaseLogs(s, id));
  const logsStatus = useSelector((s) => selectCaseLogsStatus(s, id));
  const logsError = useSelector((s) => selectCaseLogsError(s, id));

  const updateStatus = useSelector(selectUpdateStatus);
  const updateError = useSelector(selectUpdateError);

  const isChangeOpen = useSelector(selectChangeUIIsChangeOpen);
  const nextState = useSelector(selectChangeUINextState);
  const nextComment = useSelector(selectChangeUIComment);

  useEffect(() => {
    if (!id) return;
    dispatch(setCurrentCaseId(id));
    dispatch(loadCaseById(id));
    dispatch(loadCaseLogById(id));
    dispatch(resetChangeStatusUI());
  }, [dispatch, id]);

  const isLoading = status === "loading";
  const isUpdating = updateStatus === "loading";
  const isLogsLoading = logsStatus === "loading";

  const title = useMemo(() => {
    if (!id) return "Case details";
    if (item?.title) return `${item.title} (${id})`;
    return `Case ${id}`;
  }, [id, item?.title]);

  const backTo = useMemo(() => {
    const search = location.search || "";
    return `/cases${search}`;
  }, [location.search]);

  return (
      <Card>
        {(isLoading || isUpdating) && (
            <Loader text={isUpdating ? "Saving changes…" : "Loading case…"} />
        )}

        <Row justify="space-between" wrap>
          <div>
            <div className="pageTitle">{title}</div>
            <div className="back">
              <Link to={backTo} className="backLink">
                ← Back to cases
              </Link>
            </div>
          </div>

          <Button
              onClick={() =>
                  isChangeOpen
                      ? dispatch(closeChangeStatus())
                      : dispatch(openChangeStatus())
              }
              disabled={!id || isLoading}
          >
            Change status
          </Button>
        </Row>

        {status === "failed" && (
            <div className="section">
              <ErrorBox status="error" title="Failed to load case">
                {String(error || "")}
              </ErrorBox>
            </div>
        )}

        <Drawer
            isOpen={isChangeOpen}
            onClose={() => dispatch(closeChangeStatus())}
        >
          <div className="drawerBody">
            <Row justify="space-between" wrap>
              <div>
                <div className="drawerTitle">Change case status</div>
                <div className="drawerSubtitle">Case: {id || "—"}</div>
              </div>
              <Button onClick={() => dispatch(closeChangeStatus())}>
                Cancel
              </Button>
            </Row>

            <div className="panel">
              <Row gap={10} wrap>
                <select
                    className="select"
                    value={nextState}
                    onChange={(e) => dispatch(setNextState(e.target.value))}
                    aria-label="Next state"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="waiting_customer">Waiting customer</option>
                </select>
              </Row>

              <textarea
                  className="input textarea"
                  placeholder="Comment…"
                  value={nextComment}
                  onChange={(e) => dispatch(setComment(e.target.value))}
                  rows={3}
              />

              {updateStatus === "failed" && (
                  <div className="drawerError">
                    <ErrorBox status="error" title="Failed to update">
                      {String(updateError || "")}
                    </ErrorBox>
                  </div>
              )}
            </div>

            <Button
                disabled={
                    !id ||
                    isUpdating ||
                    (nextState === (item?.state || "") &&
                        String(nextComment || "").trim().length === 0)
                }
                onClick={() => {
                  if (!id) return;
                  dispatch(
                      updateCaseState({
                        caseId: id,
                        state: nextState,
                        comment: nextComment,
                      }),
                  );
                }}
            >
              Save
            </Button>
          </div>
        </Drawer>

        {item && status === "succeeded" && (
            <div className="section detailsGrid">
              <Card>
                <div className="blockTitle">Overview</div>
                <div className="kv">
                  <div className="k">State</div>
                  <div className="v">{formatState(item.state)}</div>
                  <div className="k">Severity</div>
                  <div className="v">{item.severity || "—"}</div>
                  <div className="k">Category</div>
                  <div className="v">{item.category || "—"}</div>
                  <div className="k">Channel</div>
                  <div className="v">{item.channel || "—"}</div>
                  <div className="k">Created</div>
                  <div className="v">{formatDate(item.createdAt)}</div>
                  <div className="k">Updated</div>
                  <div className="v">{formatDate(item.updatedAt)}</div>
                </div>
              </Card>

              <Card>
                <div className="blockTitle">Customer</div>
                <div className="kv">
                  <div className="k">Name</div>
                  <div className="v">{item.customer?.name || "—"}</div>
                  <div className="k">Email</div>
                  <div className="v">{item.customer?.email || "—"}</div>
                  <div className="k">Company</div>
                  <div className="v">{item.customer?.company || "—"}</div>
                </div>

                <div className="split" />

                <div className="blockTitle">SLA</div>
                <div className="kv">
                  <div className="k">Due</div>
                  <div className="v">{formatDate(item.sla?.dueAt)}</div>
                  <div className="k">Breached</div>
                  <div className="v">{item.sla?.breached ? "Yes" : "No"}</div>
                </div>
              </Card>

              <Card>
                <div className="blockTitle">Description</div>
                <div className="description">{item.description || "—"}</div>
                {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="tags">
                      {item.tags.map((t) => (
                          <span key={t} className="tag">
                    {t}
                  </span>
                      ))}
                    </div>
                )}
              </Card>

              <Card>
                <Row justify="space-between" wrap>
                  <div className="blockTitle">Activity log</div>
                  <Button
                      onClick={() => {
                        if (!id) return;
                        dispatch(loadCaseLogById(id));
                      }}
                      disabled={!id || isLogsLoading}
                  >
                    Refresh log
                  </Button>
                </Row>

                {isLogsLoading && <Loader text="Loading log…" />}

                {logsStatus === "failed" && (
                    <div className="section">
                      <ErrorBox status="error" title="Failed to load log">
                        {String(logsError || "")}
                      </ErrorBox>
                    </div>
                )}

                {!isLogsLoading && logs.length === 0 && (
                    <div className="mutedText">No log entries.</div>
                )}

                {!isLogsLoading && logs.length > 0 && (
                    <div className="logList">
                      {logs.map((l) => (
                          <div key={l.id} className="logItem">
                            <div className="logMeta">
                              <div className="logAt">{formatDate(l.createdAt)}</div>
                              <div className="logTitle">
                                Status: {formatState(l.from)} → {formatState(l.to)}
                              </div>
                            </div>
                            {l.note ? <div className="logNote">{l.note}</div> : null}
                          </div>
                      ))}
                    </div>
                )}
              </Card>
            </div>
        )}
      </Card>
  );
}
