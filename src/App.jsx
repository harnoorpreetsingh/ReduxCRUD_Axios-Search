// import AddUsers from './components/pages/AddUsers'
import Users from "./components/pages/Users";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddUsers from "./components/pages/AddUsers";

function App() {
  return (
    <>
      {/* <Users /> */}
      {/* <AddUsers /> */}
      <Routes>
        {/* <Route path = * element={<Users />} /> */}
        <Route exact path="/" element={<Users />} />
        <Route path="/addusers" element={<AddUsers />} />
      </Routes>
    </>
  );
}

export default App;
