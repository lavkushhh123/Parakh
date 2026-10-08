import { useState } from 'react'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'
import { analyzeSkillGap } from '../services/api'

function SkillGap() {

  // Load saved student profile
  // If no saved profile exists, use default studentData
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Load previously saved skill gap result
  const [gapResult, setGapResult] = useState(() => {
    const savedGap = localStorage.getItem('skillGapResult')

    return savedGap
      ? JSON.parse(savedGap)
      : null
  })

  // API loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get selected skill keys
  const selectedSkills = SKILLS
    .filter((skill) => student.skills[skill.key] === 1)
    .map((skill) => skill.key)

  // Analyze skill gap
  const handleAnalyze = async () => {

    // Get predicted career from localStorage
    const savedPrediction =
      localStorage.getItem('careerPrediction')

    const predictedCareer = savedPrediction
      ? JSON.parse(savedPrediction).career
      : ''

    // Data required by Skill Gap API
    const requestData = {
      career: predictedCareer,
      skills: selectedSkills,
    }

    console.log('Skill Gap Request:', requestData)

    setLoading(true)
    setError('')

    try {

      // Send career and skills to backend
      const result = await analyzeSkillGap(requestData)

      console.log('Skill Gap Response:', result)

      // Show result on Skill Gap page
      setGapResult(result)

      // Save result for Dashboard
      localStorage.setItem(
        'skillGapResult',
        JSON.stringify(result)
      )

    } catch (err) {

      // Show error if API request fails
      console.error('Skill Gap Error:', err)

      setError(
        'Unable to analyze skill gap right now.'
      )

    } finally {

      // Stop loading
      setLoading(false)
    }
  }

  return (
    <div className="skill-gap-page">

      {/* Page heading */}
      <div className="page-header">

        <div>

          <p className="page-label">
            SKILL GAP INTELLIGENCE
          </p>

          <h1>
            Skill Gap Analysis
          </h1>

          <p>
            Identify the skills you need to improve for
            your target career.
          </p>

        </div>

        {/* Analyze button */}
        <Button onClick={handleAnalyze}>
          {loading
            ? 'Analyzing...'
            : 'Analyze Skill Gap'}
        </Button>

      </div>

      {/* Current skills */}
      <div className="profile-card">

        <div className="section-heading">

          <p className="page-label">
            CURRENT SKILLS
          </p>

          <h2>
            Your Skills
          </h2>

          <p>
            These skills will be compared with the
            requirements of your target career.
          </p>

        </div>

        <div className="selected-skills-list">

          {selectedSkills.length > 0 ? (

            SKILLS
              .filter(
                (skill) => student.skills[skill.key] === 1
              )
              .map((skill) => (
                <span
                  className="skill-chip"
                  key={skill.key}
                >
                  {skill.name}
                </span>
              ))

          ) : (

            <p>
              No skills selected yet.
            </p>

          )}

        </div>

      </div>

      {/* API error */}
      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}

      {/* Skill gap result */}
      {gapResult && (
        <>
          {/* Target career */}
          <div className="profile-card">

            <div className="section-heading">

              <p className="page-label">
                TARGET CAREER
              </p>

              <h2>
                {gapResult.career}
              </h2>

            </div>

          </div>

          {/* Current matching skills */}
          <div className="profile-card gap-section">

            <div className="section-heading">

              <p className="page-label">
                CURRENT SKILLS
              </p>

              <h2>
                Skills You Have
              </h2>

            </div>

            <div className="gap-skill-list">

              {gapResult.current_skills.length > 0 ? (

                gapResult.current_skills.map((skill) => (

                  <span
                    className="skill-chip"
                    key={skill}
                  >
                    {skill.replaceAll('_', ' ')}
                  </span>

                ))

              ) : (

                <p>
                  No matching skills found.
                </p>

              )}

            </div>

          </div>

          {/* Missing skills */}
          <div className="profile-card gap-section">

            <div className="section-heading">

              <p className="page-label">
                SKILL GAPS
              </p>

              <h2>
                Skills You Need to Improve
              </h2>

            </div>

            <div className="gap-skill-list">

              {gapResult.missing_skills.length > 0 ? (

                gapResult.missing_skills.map((skill) => (

                  <span
                    className="skill-chip gap-missing"
                    key={skill}
                  >
                    {skill.replaceAll('_', ' ')}
                  </span>

                ))

              ) : (

                <p>
                  No skill gaps found. Great job!
                </p>

              )}

            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default SkillGap