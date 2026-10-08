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

const navClass = ({ isActive }) => isActive ? 'active' : ''

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <div className="sidebar-logo">P</div>

        <div>
          <h2>PARAKH</h2>
          <p>Career Intelligence</p>
        </div>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/" className={navClass}>
          <House size={17} />
          Home
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <User size={17} />
          Profile
        </NavLink>

        <NavLink to="/career" className={navClass}>
          <BriefcaseBusiness size={17} />
          Career Prediction
        </NavLink>

        <NavLink to="/skills" className={navClass}>
          <BarChart3 size={17} />
          Skill Analysis
        </NavLink>

        <NavLink to="/skill-gap" className={navClass}>
          <Target size={17} />
          Skill Gap
        </NavLink>

        <NavLink to="/cluster" className={navClass}>
          <Layers3 size={17} />
          My Cluster
        </NavLink>

        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard size={17} />
          Dashboard
        </NavLink>

        <NavLink to="/recommendations" className={navClass}>
        <Sparkles size={17} />
        Recommendations
      </NavLink>

      <NavLink to="/career-details" className={navClass}>
        <BookOpen size={17} />
        Career Details
      </NavLink>

      </nav>

      <div className="sidebar-bottom">
        <div className="user-avatar">L</div>

        <div>
          <strong>Lavkush Nishad</strong>
          <span>Student</span>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar