import "./CaseDetails.css";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import {
  loadCaseById,
  selectCurrentCase,
  selectCaseDetailsError,
  selectCaseDetailsStatus,
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

export default function CaseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const item = useSelector(selectCurrentCase);
  const status = useSelector(selectCaseDetailsStatus);
  const error = useSelector(selectCaseDetailsError);

  const isChangeOpen = useSelector(selectChangeUIIsChangeOpen);
  const nextState = useSelector(selectChangeUINextState);
  const nextComment = useSelector(selectChangeUIComment);

  useEffect(() => {
    if (!id) return;
    dispatch(setCurrentCaseId(id));
    dispatch(loadCaseById(id));
    dispatch(resetChangeStatusUI());
  }, [dispatch, id]);

  const isLoading = status === "loading";

  const title = useMemo(() => {
    if (!id) return "Case details";
    return `Case ${id}`;
  }, [id]);

  return (
    <Card>
      {isLoading && <Loader text="Loading case…" />}

      <Row justify="space-between" wrap>
        <div>
          <div className="pageTitle">{title}</div>
          <div className="back">
            <Link to="/cases" className="backLink">
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

      <Drawer isOpen={isChangeOpen}>
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
                <option value="waiting_customer">Waiting Customer</option>
              </select>
            </Row>

            <textarea
              className="input textarea"
              placeholder="Comment…"
              value={nextComment}
              onChange={(e) => dispatch(setComment(e.target.value))}
              rows={3}
            />

            <div className="hint">
              Selected: <b>{nextState}</b>
              {nextComment ? (
                <>
                  {" "}
                  • Comment length: <b>{nextComment.length}</b>
                </>
              ) : null}
            </div>
          </div>{" "}
          <Button
            onClick={() => {
              /* TODO: implement */
            }}
          >
            Save
          </Button>
        </div>
      </Drawer>

      {item && (
        <div className="section">
          <Card>
            <h3>Show full item detail here</h3>
            <p>{JSON.stringify(item)}</p>
          </Card>
          <Card>
            <h3>Show log here</h3>
          </Card>
        </div>
      )}
    </Card>
  );
}
