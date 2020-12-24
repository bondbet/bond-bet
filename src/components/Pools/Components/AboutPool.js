import React from 'react'

const AboutPool = ({title, description, more}) => {
    return (
        <div className='pools-box-content required-changes'>
            <div className='pools-box-inner required-changes'>
                <h1 className='pools-box-inner-title required-changes'>{title}</h1>
                <p className='pools-box-inner-description'>{description}</p>
                <p className='pools-box-inner-description'>{more}</p>
            </div>
        </div>
    )
}

export default AboutPool
