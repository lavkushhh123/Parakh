import { useState } from 'react'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'
import { getRecommendations } from '../services/api'

function Recommendations() {
  // Load saved profile
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Load saved recommendations
  const [recommendations, setRecommendations] = useState(() => {
    const savedRecommendations =
      localStorage.getItem('careerRecommendations')

    return savedRecommendations
      ? JSON.parse(savedRecommendations)
      : null
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get selected skills
  const selectedSkills = SKILLS
    .filter((skill) => student.skills[skill.key] === 1)
    .map((skill) => skill.key)

  // Call recommendations API
  const handleRecommend = async () => {
    const savedPrediction =
      localStorage.getItem('careerPrediction')

    const predictedCareer = savedPrediction
      ? JSON.parse(savedPrediction).career
      : ''

    const requestData = {
      skills: selectedSkills,
      predicted_career: predictedCareer,
    }

    console.log('Recommendations Request:', requestData)

    setLoading(true)
    setError('')

    try {
      const result = await getRecommendations(requestData)

      console.log('Recommendations Response:', result)

      setRecommendations(result)

      localStorage.setItem(
        'careerRecommendations',
        JSON.stringify(result)
      )
    } catch (err) {
      console.error('Recommendations Error:', err)

      setError(
        'Unable to get career recommendations right now.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recommendations-page">

      <div className="page-header">
        <div>
          <p className="page-label">
            CAREER RECOMMENDATIONS
          </p>

          <h1>Career Recommendations</h1>

          <p>
            Explore career paths that match your
            current skills and predicted career.
          </p>
        </div>

        <Button onClick={handleRecommend}>
          {loading
            ? 'Getting Recommendations...'
            : 'Get Recommendations'}
        </Button>
      </div>


      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">
            RECOMMENDATION INPUT
          </p>

          <h2>Your Skill Profile</h2>

          <p>
            Your selected skills and predicted career
            will be used to generate recommendations.
          </p>
        </div>


        <div className="cluster-skill-summary">

          <div className="cluster-stat">
            <span>Selected Skills</span>
            <strong>
              {selectedSkills.length}
            </strong>
          </div>

          <div className="cluster-stat">
            <span>Predicted Career</span>

            <strong>
              {(() => {
                const savedPrediction =
                  localStorage.getItem('careerPrediction')

                return savedPrediction
                  ? JSON.parse(savedPrediction).career
                  : 'Not Predicted Yet'
              })()}
            </strong>
          </div>

        </div>


        <div className="selected-skills">

          <h3>Selected Skills</h3>

          <div className="selected-skills-list">

            {selectedSkills.length > 0 ? (
              SKILLS
                .filter(
                  (skill) =>
                    student.skills[skill.key] === 1
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
              <p>No skills selected yet.</p>
            )}

          </div>

        </div>

      </div>


      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}


      {recommendations && (
        <div className="profile-card">

          <div className="section-heading">

            <p className="page-label">
              RECOMMENDATION RESULT
            </p>

            <h2>Suggested Career Paths</h2>

          </div>


          <div className="recommendation-list">

            {recommendations.recommendations?.length > 0 ? (
              recommendations.recommendations.map(
                (recommendation, index) => (
                  <div
                    className="recommendation-item"
                    key={`${recommendation.career}-${index}`}
                  >

                    <div>
                      <span>Career</span>

                      <h3>
                        {recommendation.career}
                      </h3>
                    </div>


                    <div>
                      <span>Match Score</span>

                      <strong>
                        {Math.round(
                          recommendation.score * 100
                        )}
                        %
                      </strong>
                    </div>

                  </div>
                )
              )
            ) : (
              <p>
                No career recommendations found.
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default Recommendations