import React from 'react'

const UserProfile = () => {
  return (
    <>
      <div className="user-profile">
        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHZwyVsGPfl0w/profile-displayphoto-shrink_800_800/0/1635870307671?e=1642636800&v=beta&t=MZsL3JjIbo4LuyStMd5JWe6M3i6ZGY3sxxet4AKiLUQ" alt="profilepic"/>
        <div className="profile-details">
          <h3 id="userName">Drew White</h3>
          <button>Log out</button>
        </div>
      </div>
      <h2>Saved Lists</h2>
    </>
  )
}

export default UserProfile
