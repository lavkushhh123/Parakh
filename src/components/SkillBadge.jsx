
function SkillBadge({ skill, type = "default" }) {
  return (
    <span className={`skill-badge ${type}`}>
      {skill}
    </span>
  )
}

export default SkillBadge