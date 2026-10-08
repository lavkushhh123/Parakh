import { useState } from 'react'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'
import { predictCareer } from '../services/api'

function CareerPrediction() {

  // Load saved profile from localStorage
  // If no saved profile exists, use default studentData
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Load previously saved career prediction
  // This keeps the prediction available after page refresh
  const [prediction, setPrediction] = useState(() => {
    const savedPrediction = localStorage.getItem('careerPrediction')

    return savedPrediction
      ? JSON.parse(savedPrediction)
      : null
  })

  // API loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Send student skills and experience to backend
  const handlePredict = async () => {

    // Data required by prediction API
    const requestData = {
      experience_years: Number(student.experience_years),
      skills: student.skills,
    }

    console.log('Prediction Request:', requestData)

    setLoading(true)
    setError('')

    try {
      // Call career prediction API
      const result = await predictCareer(requestData)

      console.log('Prediction Response:', result)

      // Show prediction on the page
      setPrediction(result)

      // Save prediction for Skill Gap and other pages
      localStorage.setItem(
        'careerPrediction',
        JSON.stringify(result)
      )

    } catch (err) {

      // Show error if API request fails
      console.error('Prediction Error:', err)
      setError('Unable to predict career right now.')

    } finally {

      // Stop loading state
      setLoading(false)
    }
  }

  return (
    <div className="career-page">

      {/* Page heading and prediction button */}
      <div className="page-header">
        <div>
          <p className="page-label">CAREER INTELLIGENCE</p>

          <h1>Career Prediction</h1>

          <p>
            Predict the career path that best matches your skills and
            experience.
          </p>
        </div>

        <Button onClick={handlePredict}>
          {loading ? 'Predicting...' : 'Predict Career'}
        </Button>
      </div>

      {/* Student information used for prediction */}
      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">PREDICTION INPUT</p>
          <h2>Your Profile</h2>
        </div>

        <div className="prediction-input-grid">

          {/* Experience */}
          <div className="prediction-info">
            <span>Experience</span>

            <strong>
              {student.experience_years} years
            </strong>
          </div>

          {/* Number of selected skills */}
          <div className="prediction-info">
            <span>Skills Selected</span>

            <strong>
              {Object.values(student.skills)
                .filter((value) => value === 1)
                .length}
            </strong>
          </div>

        </div>

        {/* Display selected skills */}
        <div className="selected-skills">

          <h3>Selected Skills</h3>

          <div className="selected-skills-list">

            {SKILLS
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
              ))}

          </div>
        </div>

      </div>

      {/* API error message */}
      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}

      {/* Prediction result */}
      {prediction && (
        <div className="profile-card prediction-result">

          <div className="section-heading">
            <p className="page-label">PREDICTION RESULT</p>
            <h2>Recommended Career</h2>
          </div>

          <div className="prediction-result-content">

            {/* Predicted career */}
            <div>
              <span>Predicted Career</span>

              <h3>
                {prediction.career}
              </h3>
            </div>

            {/* Prediction confidence */}
            <div>
              <span>Confidence</span>

              <strong>
                {Math.round(
                  prediction.confidence * 100
                )}
                %
              </strong>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default CareerPrediction