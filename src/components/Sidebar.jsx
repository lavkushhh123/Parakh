import { NavLink } from 'react-router-dom'

import {
  House,
  User,
  BriefcaseBusiness,
  BarChart3,
  Target,
  Layers3,
  LayoutDashboard,
  Sparkles,
  BookOpen,
} from 'lucide-react'


const navClass = ({ isActive }) =>
  isActive ? 'active' : ''


function Sidebar({ isOpen, onClose }) {

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


        <NavLink
          to="/recommendations"
          className={navClass}
          onClick={onClose}
        >
          <Sparkles size={17} />
          Recommendations
        </NavLink>


        <NavLink
          to="/career-details"
          className={navClass}
          onClick={onClose}
        >
          <BookOpen size={17} />
          Career Details
        </NavLink>

      </nav>


      <div className="sidebar-bottom">

        <div className="user-avatar">
          L
        </div>

        <div>
          <strong>Lavkush Nishad</strong>
          <span>Student</span>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar