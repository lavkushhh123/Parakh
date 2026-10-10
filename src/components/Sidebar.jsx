import { NavLink } from 'react-router-dom'

import {
  House,
  User,
  BriefcaseBusiness,
  BarChart3,
  Target,
  Layers3,
  LayoutDashboard,
} from 'lucide-react'


const navClass = ({ isActive }) =>
  isActive ? 'active' : ''


function Sidebar({ isOpen, onClose }) {
  const getUserName = () => {
    try {
      const u = localStorage.getItem('user')
      if (u) {
        const parsed = JSON.parse(u)
        if (parsed?.name) return parsed.name
      }
      const p = localStorage.getItem('studentProfile')
      if (p) {
        const parsed = JSON.parse(p)
        if (parsed?.name) return parsed.name
      }
    } catch {}
    return 'Student'
  }

  const userName = getUserName()
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'S'

  return (
    <aside
      className={`sidebar ${
        isOpen ? 'sidebar-open' : ''
      }`}
    >

      <div className="sidebar-header">

        <div className="sidebar-logo">
          P
        </div>

        <div>
          <h2>PARAKH</h2>
          <p>Career Intelligence</p>
        </div>

      </div>


      <nav className="sidebar-menu">

        <NavLink
          to="/"
          className={navClass}
          onClick={onClose}
        >
          <House size={17} />
          Home
        </NavLink>


        <NavLink
          to="/profile"
          className={navClass}
          onClick={onClose}
        >
          <User size={17} />
          Profile
        </NavLink>


        <NavLink
          to="/career"
          className={navClass}
          onClick={onClose}
        >
          <BriefcaseBusiness size={17} />
          Career Prediction
        </NavLink>


        <NavLink
          to="/skills"
          className={navClass}
          onClick={onClose}
        >
          <BarChart3 size={17} />
          Skill Analysis
        </NavLink>


        <NavLink
          to="/skill-gap"
          className={navClass}
          onClick={onClose}
        >
          <Target size={17} />
          Skill Gap
        </NavLink>


        <NavLink
          to="/cluster"
          className={navClass}
          onClick={onClose}
        >
          <Layers3 size={17} />
          My Cluster
        </NavLink>


        <NavLink
          to="/dashboard"
          className={navClass}
          onClick={onClose}
        >
          <LayoutDashboard size={17} />
          Dashboard
        </NavLink>
      </nav>


      <div className="sidebar-bottom">

        <div className="user-avatar">
          {userInitial}
        </div>

        <div>
          <strong>{userName}</strong>
          <span>Student</span>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar