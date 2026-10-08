import { useState } from 'react'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'
import { analyzeCluster } from '../services/api'

function Cluster() {

  // Load saved student profile from localStorage
  // If profile is not saved, use default studentData
  const [student] = useState(() => {
    const savedProfile = localStorage.getItem('studentProfile')

    return savedProfile
      ? JSON.parse(savedProfile)
      : studentData
  })

  // Load previously saved cluster result
  // This keeps the result available after page refresh
  const [cluster, setCluster] = useState(() => {
    const savedCluster = localStorage.getItem('clusterResult')

    return savedCluster
      ? JSON.parse(savedCluster)
      : null
  })

  // Store API loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get only the skills selected by the student
  const selectedSkills = SKILLS.filter(
    (skill) => student.skills[skill.key] === 1
  )

  // Analyze student's skill cluster
  const handleAnalyze = async () => {

    // Data required by the cluster API
    const requestData = {
      skills: student.skills,
    }

    console.log('Cluster Request:', requestData)

    // Start loading
    setLoading(true)
    setError('')

    try {

      // Send skills to backend
      const result = await analyzeCluster(requestData)

      console.log('Cluster Response:', result)

      // Display result on the Cluster page
      setCluster(result)

      // Save result so Dashboard can use it
      localStorage.setItem(
        'clusterResult',
        JSON.stringify(result)
      )

    } catch (err) {

      // Show error if API request fails
      console.error('Cluster Error:', err)

      setError(
        'Unable to analyze cluster right now.'
      )

    } finally {

      // Stop loading
      setLoading(false)
    }
  }

  return (
    <div className="cluster-page">

      {/* Page heading */}
      <div className="page-header">

        <div>
          <p className="page-label">
            SKILL CLUSTER
          </p>

          <h1>
            Career Cluster
          </h1>

          <p>
            Identify the career group that best matches your
            current technical skills.
          </p>
        </div>

        {/* Analyze button */}
        <Button onClick={handleAnalyze}>
          {loading
            ? 'Analyzing...'
            : 'Analyze Cluster'}
        </Button>

      </div>

      {/* Student's current skill profile */}
      <div className="profile-card">

        <div className="section-heading">

          <p className="page-label">
            SKILL PROFILE
          </p>

          <h2>
            Your Skill Pattern
          </h2>

        </div>

        {/* Skill count */}
        <div className="cluster-skill-summary">

          <div className="cluster-stat">

            <span>
              Selected Skills
            </span>

            <strong>
              {selectedSkills.length}
            </strong>

          </div>

          <div className="cluster-stat">

            <span>
              Total Skills
            </span>

            <strong>
              {SKILLS.length}
            </strong>

          </div>

        </div>

        {/* Display selected skills */}
        <div className="cluster-skills">

          <h3>
            Active Skills
          </h3>

          <div className="selected-skills-list">

            {selectedSkills.length > 0 ? (

              selectedSkills.map((skill) => (

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

      </div>

      {/* Display API error */}
      {error && (
        <div className="profile-card">
          <p>{error}</p>
        </div>
      )}

      {/* Display cluster result */}
      {cluster && (

        <div className="profile-card cluster-result">

          <div className="section-heading">

            <p className="page-label">
              CLUSTER RESULT
            </p>

            <h2>
              Your Career Cluster
            </h2>

          </div>

          <div className="cluster-result-box">

            {/* Cluster number */}
            <div>

              <span>
                Cluster
              </span>

              <strong>
                #{cluster.cluster}
              </strong>

            </div>

            {/* Cluster name */}
            <div>

              <span>
                Cluster Name
              </span>

              <h3>
                {cluster.cluster_name}
              </h3>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Cluster