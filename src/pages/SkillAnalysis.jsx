import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'

// Calculate realistic skill proficiency score based on category complexity,
// student experience/projects, and skill-specific characteristics
const calculateSkillScore = (skill, student) => {
  const categoryBase = {
    'Frontend': 74,
    'Backend': 72,
    'Database': 73,
    'Programming': 76,
    'Tools': 80,
    'Systems': 68,
    'Cloud': 67,
    'DevOps': 65,
    'AI / ML': 64,
    'Machine Learning': 66,
    'Data Science': 70,
    'Cybersecurity': 66,
    'Mobile Development': 69,
  }

  const base = categoryBase[skill.category] || 70

  // Deterministic offset per skill (-6 to +6)
  let hash = 0
  for (let i = 0; i < skill.key.length; i++) {
    hash = (hash * 31 + skill.key.charCodeAt(i)) % 100
  }
  const offset = (hash % 13) - 6

  // Experience and project boosts from student profile
  const expYears = Number(student?.experience_years) || 0
  const projects = Number(student?.projects) || 0
  const certCount = Array.isArray(student?.certifications)
    ? student.certifications.length
    : 0

  const expBoost = Math.min(12, expYears * 3)
  const projBoost = Math.min(8, projects * 2)
  const certBoost = Math.min(5, certCount * 2)

  return Math.min(95, Math.max(52, base + offset + expBoost + projBoost + certBoost))
}

function SkillAnalysis() {
  const navigate = useNavigate()

  // Saved profile load karo
  const [student] = useState(() => {
    let savedProfile = null
    try {
      const p = localStorage.getItem('studentProfile')
      if (p) savedProfile = JSON.parse(p)
    } catch {}

    return savedProfile || studentData
  })

  // Check karega ki analysis button click hua ya nahi
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  // Profile se sirf selected skills nikalo
  const selectedSkills = SKILLS
    .filter((skill) => student?.skills?.[skill.key] === 1)
    .map((skill) => ({
      name: skill.name,
      category: skill.category,
      key: skill.key,
      score: calculateSkillScore(skill, student),
    }))

  // Score ke according skill level decide karo
  const getLevel = (score) => {
    if (score >= 80) return 'Strong'
    if (score >= 70) return 'Good'
    return 'Developing'
  }

  // Analyze button click
  const analyzeSkills = () => {
    if (selectedSkills.length === 0) {
      toast.info('Please select skills in your profile first.')
      return
    }

    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
      toast.success('Skill analysis updated successfully!')
    }, 400)
  }

  // Average skill score calculate karo
  const averageScore =
    selectedSkills.length > 0
      ? Math.round(
          selectedSkills.reduce(
            (sum, skill) => sum + skill.score,
            0
          ) / selectedSkills.length
        )
      : 0

  return (
    <div className="skills-page">

      {/* Page Header */}
      <div className="page-header skills-header">

        <div>
          <p className="page-label">SKILL ANALYSIS</p>

          <h1>Skill Analysis</h1>

          <p>
            Understand your current technical skill level and
            identify your strongest areas.
          </p>
        </div>

        <Button onClick={analyzeSkills} disabled={analyzing}>
          {analyzing
            ? 'Analyzing...'
            : analyzed
              ? 'Analysis Complete'
              : 'Analyze Skills'}
        </Button>

      </div>


      {/* Skill Summary */}
      <div className="skill-overview">

        <div className="skill-overview-card">
          <span>Total Skills</span>

          <strong>
            {selectedSkills.length}
          </strong>

          <small>Technical skills selected</small>
        </div>


        <div className="skill-overview-card">
          <span>Strong Skills</span>

          <strong>
            {
              selectedSkills.filter(
                (skill) => skill.score >= 80
              ).length
            }
          </strong>

          <small>80% and above</small>
        </div>


        <div className="skill-overview-card">
          <span>Average Score</span>

          <strong>
            {averageScore}%
          </strong>

          <small>Overall proficiency</small>
        </div>

      </div>


      {/* Skill Performance */}
      <div className="profile-card skill-analysis-panel">

        <div className="section-heading">

          <div>
            <p className="page-label">YOUR SKILLS</p>
            <h2>Skill Performance</h2>
          </div>

          <span className="panel-badge">
            {selectedSkills.length} Skills
          </span>

        </div>


        <div className="skill-analysis-list">

          {selectedSkills.length > 0 ? (

            selectedSkills.map((skill) => (

              <div
                className="skill-analysis-item"
                key={skill.name}
              >

                <div className="skill-analysis-info">

                  <div className="skill-name-area">

                    <div className="skill-letter">
                      {skill.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{skill.name}</strong>
                      <span>{skill.category}</span>
                    </div>

                  </div>


                  <div className="skill-score-area">

                    <span
                      className={
                        skill.score >= 80
                          ? 'skill-level strong'
                          : skill.score >= 70
                            ? 'skill-level good'
                            : 'skill-level developing'
                      }
                    >
                      {getLevel(skill.score)}
                    </span>

                    <b>{skill.score}%</b>

                  </div>

                </div>


                <ProgressBar
                  label=""
                  value={skill.score}
                />

              </div>

            ))

          ) : (

            <div style={{ padding: '16px 0' }}>
              <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                No skills selected yet. Please update your profile to select skills.
              </p>
              <Button onClick={() => navigate('/profile')}>
                Select Skills in Profile
              </Button>
            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default SkillAnalysis