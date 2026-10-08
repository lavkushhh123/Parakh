import { useState } from 'react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  // Saved profile load karo
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')
    return savedProfile ? JSON.parse(savedProfile) : studentData
  })

  // Saved career prediction load karo
  const [prediction] = useState(() => {
    const savedPrediction = localStorage.getItem('careerPrediction')
    return savedPrediction ? JSON.parse(savedPrediction) : null
  })

  // Saved cluster result load karo
  const [cluster] = useState(() => {
    const savedCluster = localStorage.getItem('clusterResult')
    return savedCluster ? JSON.parse(savedCluster) : null
  })

  // Saved skill gap result load karo
  const [gap] = useState(() => {
    const savedGap = localStorage.getItem('skillGapResult')
    return savedGap ? JSON.parse(savedGap) : null
  })

  // Saved career recommendations load karo
  const [recommendations] = useState(() => {
    const savedRecommendations = localStorage.getItem(
      'careerRecommendations'
    )

    return savedRecommendations
      ? JSON.parse(savedRecommendations)
      : null
  })

  // Selected skills
  const selectedSkills = SKILLS.filter(
    (skill) => student.skills[skill.key] === 1
  )

  // Overall skill percentage
  const skillPercentage = Math.round(
    (selectedSkills.length / SKILLS.length) * 100
  )

  // Careers for recommendation section
  const careers = recommendations?.recommendations?.length
    ? recommendations.recommendations.map((item) => ({
        name: item.career,
        score: Math.round(item.score * 100),
      }))
    : prediction
      ? [
          {
            name: prediction.career,
            score: Math.round(prediction.confidence * 100),
          },
        ]
      : []

  return (
    <div className="home-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="page-header">
        <div>
          <p className="page-label">OVERVIEW</p>

          <h1>Welcome back, {student.name}</h1>

          <p>
            Here's your career progress at a glance.
          </p>
        </div>

        <Button onClick={() => navigate('/profile')}>
          View Profile
        </Button>
      </section>


      {/* =========================
          STATS
      ========================= */}

      <section className="stats-grid">

        <Card
          title="Primary Career"
          value={prediction?.career || 'Not Predicted'}
          description={
            prediction
              ? `${Math.round(
                  prediction.confidence * 100
                )}% career match`
              : 'Run career prediction'
          }
        />

        <Card
          title="Overall Skills"
          value={selectedSkills.length}
          description={`${selectedSkills.length} of ${SKILLS.length} skills selected`}
        />

        <Card
          title="Core Competencies"
          value={selectedSkills.length}
          description="Selected technical skills"
        />

        <Card
          title="My Cluster"
          value={cluster?.cluster_name || 'Not Analyzed'}
          description={
            cluster
              ? `Cluster #${cluster.cluster}`
              : 'Run cluster analysis'
          }
        />

      </section>


      {/* =========================
          CAREER + SKILL GAP
      ========================= */}

      <div className="home-content-grid">

        {/* Career Highlight */}

        <div className="career-highlight-card">

          <div className="career-highlight-content">

            <p className="card-label">
              PRIMARY CAREER FIT
            </p>

            <h2>
              {prediction?.career || 'Not Predicted Yet'}
            </h2>

            <p className="card-description">
              {prediction
                ? `Your current skills show a ${Math.round(
                    prediction.confidence * 100
                  )}% compatibility with ${prediction.career} roles.`
                : 'Run career prediction to see your career compatibility.'}
            </p>

            <div className="career-progress-list">

              <ProgressBar
                label="Skill Compatibility"
                value={
                  prediction
                    ? Math.round(
                        prediction.confidence * 100
                      )
                    : 0
                }
              />

              <ProgressBar
                label="Career Readiness"
                value={skillPercentage}
              />

            </div>

            <Button onClick={() => navigate('/career')}>
              View Career Prediction
            </Button>

          </div>


          <div className="career-match-circle">

            <span>Career Match</span>

            <strong>
              {prediction
                ? `${Math.round(
                    prediction.confidence * 100
                  )}%`
                : '—'}
            </strong>

            <small>
              {prediction
                ? 'Based on your profile'
                : 'Not available yet'}
            </small>

          </div>

        </div>


        {/* Skill Gap Highlight */}

        <div className="skill-gap-highlight-card">

          <div className="card-top">

            <div>
              <p className="card-label">
                HIGH PRIORITY SKILL GAPS
              </p>

              <h2>Skills to Improve</h2>
            </div>

            <span className="gap-count">
              {gap?.missing_skills?.length || 0}
            </span>

          </div>


          <p className="card-description">
            {gap
              ? 'These skills can improve your readiness for your target career.'
              : 'Run skill gap analysis to see the skills you need to improve.'}
          </p>


          <div className="skill-gap-list">

            {gap?.missing_skills?.length > 0 ? (
              gap.missing_skills
                .slice(0, 3)
                .map((skill) => (
                  <div
                    className="skill-gap-row"
                    key={skill}
                  >

                    <div>
                      <strong>
                        {skill.replaceAll('_', ' ')}
                      </strong>

                      <span>
                        Needs Improvement
                      </span>
                    </div>

                    <b>Gap</b>

                  </div>
                ))
            ) : (
              <p>
                No skill gap analysis available yet.
              </p>
            )}

          </div>


          <Button onClick={() => navigate('/skill-gap')}>
            View Skill Gap
          </Button>

        </div>

      </div>


      {/* =========================
          CURRENT SKILLS
      ========================= */}

      <section className="skills-highlight-card">

        <div className="section-heading">

          <p className="page-label">
            CURRENT SKILLS
          </p>

          <h2>Your Skill Profile</h2>

        </div>


        <div className="skills-profile-grid">

          {selectedSkills.length > 0 ? (
            selectedSkills
              .slice(0, 6)
              .map((skill) => (
                <div
                  className="skill-profile-item"
                  key={skill.key}
                >

                  <div>
                    <strong>
                      {skill.name}
                    </strong>

                    <span>
                      Technical Skill
                    </span>
                  </div>

                  <b>Active</b>

                </div>
              ))
          ) : (
            <p>
              No skills selected yet.
            </p>
          )}

        </div>


        <ProgressBar
          label="Overall Skill Progress"
          value={skillPercentage}
        />

      </section>


      {/* =========================
          CAREER RECOMMENDATIONS
      ========================= */}

      <section className="skills-highlight-card">

        <div className="section-heading">

          <p className="page-label">
            CAREER RECOMMENDATIONS
          </p>

          <h2>Suggested Career Paths</h2>

        </div>


        {careers.length > 0 ? (
          <div className="skills-profile-grid">

            {careers
              .slice(0, 3)
              .map((career) => (
                <div
                  className="skill-profile-item"
                  key={career.name}
                >

                  <div>
                    <strong>
                      {career.name}
                    </strong>

                    <span>
                      Career Match
                    </span>
                  </div>

                  <b>
                    {career.score}%
                  </b>

                </div>
              ))}

          </div>
        ) : (
          <p>
            Run career prediction or recommendations
            to see suggested career paths.
          </p>
        )}

        <Button
          onClick={() =>
            navigate('/recommendations')
          }
        >
          View Recommendations
        </Button>

      </section>

    </div>
  )
}

export default Home