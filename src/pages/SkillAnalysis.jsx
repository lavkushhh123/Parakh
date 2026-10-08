import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'

function SkillAnalysis() {

  // Saved profile load karo
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Check karega ki analysis button click hua ya nahi
  const [analyzed, setAnalyzed] = useState(false)

  // Profile se sirf selected skills nikalo
  const selectedSkills = SKILLS
    .filter((skill) => student.skills[skill.key] === 1)
    .map((skill) => ({
      name: skill.name,
      category: skill.category,
      score: 100, // Temporary score, backend se actual score baad mein aayega
    }))

  // Score ke according skill level decide karo
  const getLevel = (score) => {
    if (score >= 80) return 'Strong'
    if (score >= 70) return 'Good'
    return 'Developing'
  }

  // Analyze button click
  const analyzeSkills = () => {
    setAnalyzed(true)
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

        <Button onClick={analyzeSkills}>
          {analyzed ? 'Analysis Complete' : 'Analyze Skills'}
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

            <p>
              No skills selected. Please update your profile first.
            </p>

          )}

        </div>

      </div>

    </div>
  )
}

export default SkillAnalysis