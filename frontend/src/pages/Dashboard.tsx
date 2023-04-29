import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Navbar from "../components/Navbar";
import Token from "../types/Token";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<Token | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode<Token>(token)
      setUser(decodedToken)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }} className="drop-shadow-2xl">
      <Navbar notifications={[]} />
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li><a>Home</a></li>
            <li><a>Profile</a></li>
            <li><a>Accounts</a></li>
            <li><a>Pay & Transfer</a></li>
            <li><a>Notifications</a></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
