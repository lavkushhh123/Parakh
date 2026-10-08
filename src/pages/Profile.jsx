import { useState } from 'react'
import { Pencil } from 'lucide-react'

import studentData from '../data/studentData'
import SKILLS from '../data/skills'
import Button from '../components/Button'

function Profile() {
  const [profile, setProfile] = useState(() => {
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
          [skillKey]:
            prev.skills[skillKey] === 1 ? 0 : 1,
        },
      }

      localStorage.setItem(
        'studentProfile',
        JSON.stringify(updatedProfile)
      )

      return updatedProfile
    })
  }

  const handleSave = () => {
    localStorage.setItem(
      'studentProfile',
      JSON.stringify(profile)
    )

    console.log('Student Profile:', profile)

    alert('Profile saved successfully!')
  }

  const selectedSkills = SKILLS.filter(
    (skill) => profile.skills?.[skill.key] === 1
  )

  const completedSkills = selectedSkills.length
  const totalSkills = SKILLS.length

  const profileCompletion = Math.min(
    100,
    Math.round(
      (
        [
          profile.name,
          profile.education,
          profile.degree,
          profile.experience_years !== undefined &&
            profile.experience_years !== '',
          profile.projects !== undefined &&
            profile.projects !== '',
          completedSkills > 0,
        ].filter(Boolean).length / 6
      ) * 100
    )
  )

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'L'

  return (
    <div className="profile-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <p className="page-label">
            STUDENT PROFILE
          </p>

          <h1>My Profile</h1>

          <p>
            Manage your personal information, skills
            and career details.
          </p>
        </div>

        <Button onClick={handleSave}>
          Save Profile
        </Button>

      </div>


      {/* PROFILE SUMMARY */}

      <div className="profile-summary-card">

        <div className="profile-summary-left">

          <div className="profile-summary-avatar">
            {initials}
          </div>

          <div className="profile-summary-info">

            <h2>
              {profile.name || 'Student'}
            </h2>

            <p>
              {profile.education || 'Education'}
              <span>•</span>
              {profile.degree || 'Degree'}
            </p>

            <div className="profile-summary-meta">

              <span>
                {profile.experience_years !== undefined &&
                profile.experience_years !== ''
                  ? `${profile.experience_years} Years Experience`
                  : 'Experience not added'}
              </span>

              <span>
                {completedSkills} Skills
              </span>

              <span>
                {profile.projects || 0} Projects
              </span>

            </div>

          </div>

        </div>


        <div className="profile-completion">

          <div className="profile-completion-top">

            <span>
              Profile Completion
            </span>

            <strong>
              {profileCompletion}%
            </strong>

          </div>

          <div className="profile-completion-track">

            <div
              className="profile-completion-fill"
              style={{
                width: `${profileCompletion}%`,
              }}
            />

          </div>

          <p>
            Complete your profile to get better
            career recommendations.
          </p>

        </div>

      </div>


      {/* BASIC INFORMATION */}

      <div className="profile-card">

        <div className="profile-section-header">

          <div>
            <p className="page-label">
              PERSONAL INFORMATION
            </p>

            <h2>
              Basic Details
            </h2>
          </div>

          <button
            type="button"
            className="profile-edit-button"
            onClick={() => {
              document
                .querySelector('.profile-form-grid')
                ?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
            }}
            aria-label="Edit profile"
          >
            <Pencil size={17} />
          </button>

        </div>


        <div className="profile-form-grid">

          {/* Student ID */}

          <div className="form-group">

            <label>
              Student ID
            </label>

            <input
              type="text"
              value={profile.student_id}
              disabled
            />

          </div>


          {/* Name */}

          <div className="form-group">

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

          </div>


          {/* Education */}

          <div className="form-group">

            <label>
              Education
            </label>

            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
            />

          </div>


          {/* Degree */}

          <div className="form-group">

            <label>
              Degree
            </label>

            <input
              type="text"
              name="degree"
              value={profile.degree}
              onChange={handleChange}
            />

          </div>


          {/* Experience */}

          <div className="form-group">

            <label>
              Experience (Years)
            </label>

            <input
              type="number"
              min="0"
              name="experience_years"
              value={profile.experience_years}
              onChange={handleChange}
            />

          </div>


          {/* Projects */}

          <div className="form-group">

            <label>
              Projects
            </label>

            <input
              type="number"
              min="0"
              name="projects"
              value={profile.projects}
              onChange={handleChange}
            />

          </div>

        </div>


        <div className="profile-save-area">

          <Button onClick={handleSave}>
            Save Profile
          </Button>

        </div>

      </div>


      {/* SKILLS */}

      <div className="profile-card">

        <div className="section-heading">

          <p className="page-label">
            TECHNICAL SKILLS
          </p>

          <h2>
            Select Your Skills
          </h2>

          <p>
            Select the skills you currently have.
          </p>

        </div>


        <div className="profile-skills-grid">

          {SKILLS.map((skill) => {

            const isSelected =
              profile.skills?.[skill.key] === 1

            return (
              <button
                type="button"
                key={skill.key}
                className={`profile-skill ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() =>
                  toggleSkill(skill.key)
                }
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


      {/* ADDITIONAL INFORMATION */}

      <div className="profile-card">

        <div className="section-heading">

          <p className="page-label">
            ADDITIONAL INFORMATION
          </p>

          <h2>
            Career Interests
          </h2>

        </div>


        <div className="profile-info-grid">

          <div>

            <strong>
              Interests
            </strong>

            <p>
              {profile.interests.join(', ')}
            </p>

          </div>


          <div>

            <strong>
              Certifications
            </strong>

            <p>
              {profile.certifications.length > 0
                ? profile.certifications.join(', ')
                : 'No certifications added'}
            </p>

          </div>


          <div>

            <strong>
              Soft Skills
            </strong>

            <p>
              {profile.soft_skills.join(', ')}
            </p>

          </div>

        </div>

      </div>


      {/* PROFILE SUMMARY FOOTER */}

      <div className="profile-footer-summary">

        <div>

          <span>
            Selected Skills
          </span>

          <strong>
            {completedSkills} / {totalSkills}
          </strong>

        </div>


        <div>

          <span>
            Experience
          </span>

          <strong>
            {profile.experience_years || 0} Years
          </strong>

        </div>


        <div>

          <span>
            Projects
          </span>

          <strong>
            {profile.projects || 0}
          </strong>

        </div>

      </div>

    </div>
  )
}

export default Profile