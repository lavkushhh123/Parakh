
import { useState } from 'react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'

function Dashboard() {

  // Load saved student profile
  // If no saved profile exists, use default studentData
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Load saved career prediction
  const [prediction] = useState(() => {
    const savedPrediction =
      localStorage.getItem('careerPrediction')

    return savedPrediction
      ? JSON.parse(savedPrediction)
      : null
  })

  // Load saved cluster result
  const [cluster] = useState(() => {
    const savedCluster =
      localStorage.getItem('clusterResult')

    return savedCluster
      ? JSON.parse(savedCluster)
      : null
  })

  // Saved career recommendations ko localStorage se read kar rahe hain
// Recommendations page API response ko "careerRecommendations" key me save karta hai
const [recommendations] = useState(() => {
  const savedRecommendations =
    localStorage.getItem('careerRecommendations')

  // Agar saved recommendations hain to JSON ko JavaScript object me convert karo
  // Agar nahi hain to null rakho
  return savedRecommendations
    ? JSON.parse(savedRecommendations)
    : null
})

  // Load saved skill gap result
  const [gap] = useState(() => {
    const savedGap =
      localStorage.getItem('skillGapResult')

    return savedGap
      ? JSON.parse(savedGap)
      : null
  })

  // Get only the selected skills
  const selectedSkills = SKILLS.filter(
    (skill) => student.skills[skill.key] === 1
  )

  // Temporary career list
  // Later this will come from Recommendation API
  
  // Recommendations available hain to unhe Dashboard par show karo
const careers = recommendations?.recommendations?.length
  ? recommendations.recommendations.map((item) => ({
      name: item.career,
      score: Math.round(item.score * 100),
    }))
  : [
      // Recommendations nahi hain to prediction ko fallback rakho
      {
        name: prediction?.career || 'Not Predicted Yet',
        score: prediction
          ? Math.round(prediction.confidence * 100)
          : 0,
      },
    ]

    
  return (
    <div className="dashboard-page">

      {/* Dashboard heading */}
      <div className="page-header dashboard-header">

        <div>

          <p className="page-label">
            DASHBOARD
          </p>

          <h1>
            Career Intelligence Dashboard
          </h1>

          <p>
            Track your career predictions, skills and
            improvement areas in one place.
          </p>

        </div>

        {/* Dashboard status */}
        <div className="dashboard-status">

          <span className="status-dot"></span>

          Analysis Ready

        </div>

      </div>

      {/* Main dashboard statistics */}
      <div className="stats-grid dashboard-stats">

        {/* Primary career */}
        <Card
          title="Primary Career"
          value={
            prediction?.career ||
            'Not Predicted'
          }
          description={
            prediction
              ? `${Math.round(
                  prediction.confidence * 100
                )}% career match`
              : 'Run career prediction first'
          }
        />

        {/* Selected skills */}
        <Card
          title="Selected Skills"
          value={selectedSkills.length}
          description={
            `Out of ${SKILLS.length} available skills`
          }
        />

        {/* Skill gap */}
        <Card
          title="Skill Gaps"
          value={
            gap
              ? gap.missing_skills.length
              : '—'
          }
          description={
            gap
              ? 'Skills you need to improve'
              : 'Run skill gap analysis'
          }
        />

        {/* Cluster */}
        <Card
          title="My Cluster"
          value={
            cluster?.cluster_name ||
            'Not Analyzed'
          }
          description={
            cluster
              ? `Cluster #${cluster.cluster}`
              : 'Run cluster analysis first'
          }
        />

      </div>

      {/* Career and skill sections */}
      <div className="dashboard-grid">

        {/* Career prediction panel */}
        <div className="profile-card dashboard-panel">

          <div className="section-heading">

            <div>

              <p className="page-label">
                CAREER MATCHES
              </p>

              <h2>
                Career Prediction
              </h2>

            </div>

            <span className="panel-badge">
              Top Matches
            </span>

          </div>

          <div className="dashboard-careers">

            {careers.map((career, index) => (

              <div
                className="dashboard-career"
                key={career.name}
              >

                <div className="dashboard-career-top">

                  <div className="career-name">

                    {/* Career ranking */}
                    <span className="career-rank">
                      {index + 1}
                    </span>

                    <strong>
                      {career.name}
                    </strong>

                  </div>

                  {/* Career score */}
                  <span className="career-score">
                    {career.score}%
                  </span>

                </div>

                {/* Career progress */}
                <div className="dashboard-progress">

                  <ProgressBar
                    label=""
                    value={career.score}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Selected skills panel */}
        <div className="profile-card dashboard-panel">

          <div className="section-heading">

            <div>

              <p className="page-label">
                SKILL PROFILE
              </p>

              <h2>
                Selected Skills
              </h2>

            </div>

            <span className="panel-badge">
              {selectedSkills.length} Selected
            </span>

          </div>

          <div className="dashboard-skills">

            {selectedSkills.length > 0 ? (

              selectedSkills.map((skill) => (

                <div
                  className="dashboard-skill"
                  key={skill.key}
                >

                  <div>

                    <strong>
                      {skill.name}
                    </strong>

                    <span>
                      Selected
                    </span>

                  </div>

                  {/* Selected skill progress */}
                  <div className="dashboard-progress">

                    <ProgressBar
                      label=""
                      value={100}
                    />

                  </div>

                </div>

              ))

            ) : (

              <p>
                No skills selected yet.
              </p>

            )}

          </div>

        </div>

      </div>

      {/* Recommended next step */}
      <div className="profile-card dashboard-recommendation">

        <div className="recommendation-icon">
          →
        </div>

        <div>

          <p className="page-label">
            RECOMMENDED NEXT STEP
          </p>

          <h2>
            Continue your career analysis
          </h2>

          <p>
            Run Skill Gap and Cluster analysis to
            understand which skills you should improve
            and which career cluster matches your profile.
          </p>

        </div>

        {/* Selected skill count */}
        <div className="recommendation-score">

          <span>
            {selectedSkills.length}
          </span>

          <small>
            Selected Skills
          </small>

        </div>

      </div>

    </div>
  )
}

export default Dashboard