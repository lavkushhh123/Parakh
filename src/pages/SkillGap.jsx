import { useState } from 'react'
import { toast } from 'react-toastify'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'
import { analyzeSkillGap } from '../services/api'

const CAREER_OPTIONS = [
  'Data Scientist',
  'ML Engineer',
  'Data Analyst',
  'AI Engineer',
  'Software Developer',
  'Web Developer',
  'Backend Developer',
  'Cybersecurity Analyst',
  'Cloud Engineer',
]

function SkillGap() {

  // Load saved student profile
  // If no saved profile exists, use default studentData
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Selected target career
  const [targetCareer, setTargetCareer] = useState(() => {
    const savedPrediction = localStorage.getItem('careerPrediction')
    if (savedPrediction) {
      try {
        const parsed = JSON.parse(savedPrediction)
        if (parsed?.career) return parsed.career
      } catch {
        // ignore
      }
    }
    return 'Data Scientist'
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

  // Get active skills formatted for matching
  const selectedSkills = SKILLS.filter(
    (skill) => student?.skills?.[skill.key] === 1
  )

  const formattedSkills = selectedSkills.flatMap((skill) => {
    const list = [skill.name, skill.key]
    if (skill.name.includes('/')) {
      skill.name.split('/').forEach((part) => list.push(part.trim()))
    }
    return list
  })

  // Analyze skill gap
  const handleAnalyze = async () => {
    const careerToAnalyze = (targetCareer || 'Data Scientist').trim()

    // Data required by Skill Gap API
    const requestData = {
      career: careerToAnalyze,
      skills: formattedSkills,
    }

    console.log('Skill Gap Request:', requestData)

    setLoading(true)
    setError('')

    try {
      // Send career and skills to backend
      const result = await analyzeSkillGap(requestData)

      console.log('Skill Gap Response:', result)

      if (!result) {
        throw new Error('No response received')
      }

      const normalized = {
        career: result.career || careerToAnalyze,
        current_skills:
          result.current_skills || result.skills_you_have || [],
        missing_skills:
          result.missing_skills || result.skills_to_learn || [],
        match_score:
          typeof result.match_score === 'number'
            ? result.match_score
            : Math.round(
                ((result.current_skills?.length || 0) /
                  Math.max(
                    1,
                    (result.current_skills?.length || 0) +
                      (result.missing_skills?.length || 0)
                  )) *
                  100
              ),
      }

      // Show result on Skill Gap page
      setGapResult(normalized)

      // Save result for Dashboard
      localStorage.setItem(
        'skillGapResult',
        JSON.stringify(normalized)
      )

      toast.success('Skill gap analysis completed successfully!')

    } catch (err) {
      console.error('Skill Gap Error:', err)

      setError(
        'Unable to analyze skill gap right now. Please try again.'
      )
      toast.error('Skill gap analysis failed')

    } finally {
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
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading
            ? 'Analyzing...'
            : 'Analyze Skill Gap'}
        </Button>

      </div>

      {/* Target career selector */}
      <div className="profile-card">

        <div className="section-heading">

          <p className="page-label">
            TARGET CAREER
          </p>

          <h2>
            Select Target Career
          </h2>

          <p>
            Choose the target role to compare your current skills against.
          </p>

        </div>

        <div className="auth-field" style={{ maxWidth: '420px', marginTop: '12px' }}>
          <select
            id="target-career-select"
            value={targetCareer}
            onChange={(e) => setTargetCareer(e.target.value)}
          >
            {CAREER_OPTIONS.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
        </div>

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

            <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

              <div>
                <p className="page-label">
                  TARGET CAREER
                </p>

                <h2>
                  {gapResult.career}
                </h2>
              </div>

              {typeof gapResult.match_score === 'number' && (
                <div style={{ textAlign: 'right' }}>
                  <p className="page-label">
                    SKILL MATCH
                  </p>

                  <h2 style={{ color: 'var(--color-primary, #6366f1)' }}>
                    {Math.round(gapResult.match_score)}%
                  </h2>
                </div>
              )}

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