// Import libraries
import React from 'react'
import { PropTypes } from 'prop-types'

export const Card = ({ character }) => {
  const { image, name } = character
  return (
        <div className='card'>
            <img src={image} alt={name} width={50} loading='lazy' />
            <p>{name}</p>
        </div>
  )
}

Card.propTypes = {
  character: PropTypes.object
}

export default Card
