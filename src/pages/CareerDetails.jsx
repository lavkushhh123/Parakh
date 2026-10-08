

import { useState } from 'react'
import Button from '../components/Button'
import { getCareerDetails } from '../services/api'

function CareerDetails() {
  const [career, setCareer] = useState(() => {
    const savedPrediction =
      localStorage.getItem('careerPrediction')

    return savedPrediction
      ? JSON.parse(savedPrediction).career
      : ''
  })

  const [details, setDetails] = useState(() => {
    const savedDetails =
      localStorage.getItem('careerDetails')

    return savedDetails
      ? JSON.parse(savedDetails)
      : null
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGetDetails = async () => {
    if (!career) {
      setError(
        'Please predict a career first.'
      )
      return
    }

    setLoading(true)
    setError('')

    console.log(
      'Career Details Request:',
      career
    )

    try {
      const result =
        await getCareerDetails(career)

      console.log(
        'Career Details Response:',
        result
      )

      setDetails(result)

      localStorage.setItem(
        'careerDetails',
        JSON.stringify(result)
      )
    } catch (err) {
      console.error(
        'Career Details Error:',
        err
      )

      setError(
        'Unable to get career details right now.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="career-page">

      <div className="page-header">
        <div>
          <p className="page-label">
            CAREER INTELLIGENCE
          </p>

          <h1>Career Details</h1>

          <p>
            Explore the skills and information
            related to your predicted career.
          </p>
        </div>

        <Button onClick={handleGetDetails}>
          {loading
            ? 'Loading...'
            : 'Get Career Details'}
        </Button>
      </div>


      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">
            SELECTED CAREER
          </p>

          <h2>
            {career || 'Not Predicted Yet'}
          </h2>

          <p>
            Career details are based on your
            predicted career.
          </p>
        </div>

      </div>


      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}


      {details && (
        <>
          <div className="profile-card">

            <div className="section-heading">
              <p className="page-label">
                CAREER OVERVIEW
              </p>

              <h2>{details.career}</h2>
            </div>

            <p className="career-description">
              {details.description}
            </p>

          </div>


          <div className="profile-card">

            <div className="section-heading">
              <p className="page-label">
                REQUIRED SKILLS
              </p>

              <h2>
                Skills Required
              </h2>
            </div>

            <div className="selected-skills-list">

              {details.required_skills?.length > 0 ? (
                details.required_skills.map(
                  (skill) => (
                    <span
                      className="skill-chip"
                      key={skill}
                    >
                      {skill.replaceAll('_', ' ')}
                    </span>
                  )
                )
              ) : (
                <p>
                  No required skills found.
                </p>
              )}

            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default CareerDetails