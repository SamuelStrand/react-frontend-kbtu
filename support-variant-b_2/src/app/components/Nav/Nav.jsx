import NavButton from "../../../ui/NavButton/NavButton.jsx";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav-card">
      <div className="nav-row nav-row--space">
        <div className="nav-title">Support Desk</div>
        <div className="nav-row">
          <NavButton to="/tickets">Tickets</NavButton>
          <NavButton to="/agents">Agents</NavButton>
        </div>
      </div>
    </div>
  );
}
