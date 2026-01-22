import React from 'react'
import { Link, Links } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="cta">
        <p className ="cta-text">
           Curious about something? <br className="sm:block hidden" /> 
        Contact me!</p>
        <Link to="/contact" className="btn">
        Contact
        </Link>
    </section>
  )
}

export default CTA