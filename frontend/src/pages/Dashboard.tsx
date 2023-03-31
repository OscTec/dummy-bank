import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }} className="drop-shadow-2xl">
      <Navbar notifications={[]} />
      <Outlet />
    </div>
  )
}

export default Dashboard
