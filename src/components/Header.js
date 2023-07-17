import { Link } from "react-router-dom";

import React from 'react'

function Header() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
    </div>
  )
}

export default Header