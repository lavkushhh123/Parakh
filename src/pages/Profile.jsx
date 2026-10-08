import { useState } from 'react'
import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'

function Profile() {
 const [profile, setProfile] = useState(() => {
  // Check if a previously saved profile exists
  const savedProfile = localStorage.getItem('studentProfile')

  return savedProfile
    ? JSON.parse(savedProfile)
    : studentData
})

  const handleChange = (e) => {
    const { name, value } = e.target

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleSkill = (skillKey) => {
  setProfile((prev) => {
    const updatedProfile = {
      ...prev,
      skills: {
        ...prev.skills,
        [skillKey]: prev.skills[skillKey] === 1 ? 0 : 1,
      },
    }

    // Save updated profile for other pages
    localStorage.setItem(
      'studentProfile',
      JSON.stringify(updatedProfile)
    )

    return updatedProfile
  })
}

const handleSave = () => {
  // Save complete profile for other pages
  localStorage.setItem(
    'studentProfile',
    JSON.stringify(profile)
  )

  console.log('Student Profile:', profile)
  alert('Profile saved successfully!')
}
 
  return (
    <div className="profile-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>
          <p className="page-label">STUDENT PROFILE</p>

          <h1>My Profile</h1>

          <p>
            Manage your personal information, skills and career details.
          </p>
        </div>

        <Button onClick={handleSave}>
          Save Profile
        </Button>

      </div>


      {/* =========================
          BASIC INFORMATION
      ========================= */}

      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">PERSONAL INFORMATION</p>
          <h2>Basic Details</h2>
        </div>

        <div className="profile-form-grid">

          <div className="form-group">
            <label>Student ID</label>

            <input
              type="text"
              value={profile.student_id}
              disabled
            />
          </div>


          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Education</label>

            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Degree</label>

            <input
              type="text"
              name="degree"
              value={profile.degree}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Experience (Years)</label>

            <input
              type="number"
              min="0"
              name="experience_years"
              value={profile.experience_years}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Projects</label>

            <input
              type="number"
              min="0"
              name="projects"
              value={profile.projects}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>


      {/* =========================
          SKILLS
      ========================= */}

      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">TECHNICAL SKILLS</p>

          <h2>Select Your Skills</h2>

          <p>
            Select the skills you currently have.
          </p>
        </div>


        <div className="profile-skills-grid">

          {SKILLS.map((skill) => {

            const isSelected = profile.skills[skill.key] === 1

            return (
              <button
                type="button"
                key={skill.key}
                className={`profile-skill ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => toggleSkill(skill.key)}
              >

                <span>
                  {skill.name}
                </span>

                <small>
                  {skill.category}
                </small>

              </button>
            )
          })}

        </div>

      </div>


      {/* =========================
          ADDITIONAL INFORMATION
      ========================= */}

      <div className="profile-card">

        <div className="section-heading">
          <p className="page-label">ADDITIONAL INFORMATION</p>

          <h2>Career Interests</h2>
        </div>


        <div className="profile-info-grid">

          <div>
            <strong>Interests</strong>

            <p>
              {profile.interests.join(', ')}
            </p>
          </div>


          <div>
            <strong>Certifications</strong>

            <p>
              {profile.certifications.length > 0
                ? profile.certifications.join(', ')
                : 'No certifications added'}
            </p>
          </div>


          <div>
            <strong>Soft Skills</strong>

            <p>
              {profile.soft_skills.join(', ')}
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile