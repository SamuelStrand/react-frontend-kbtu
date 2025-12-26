import "./Nav.css";
import NavButton from "../../../ui/NavButton/NavButton.jsx";

export default function Nav() {
  return (
    <div className="nav-card">
      <div className="nav-row nav-row--space">
        <div className="nav-title">Support Desk</div>
        <div className="nav-row">
          <NavButton to="/cases">Cases</NavButton>
        </div>
      </div>
    </div>
  );
}
