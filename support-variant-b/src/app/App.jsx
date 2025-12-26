import "./App.css";
import Nav from "./components/Nav/Nav.jsx";
import { Navigate, Route, Routes } from "react-router";
import CasesPage from "./features/cases/CasesPage/CasesPage.jsx";
import CaseDetails from "./features/cases/CaseDetails/CaseDetails.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/cases" replace />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:id" element={<CaseDetails />} />
      </Routes>
    </>
  );
}

export default App;
