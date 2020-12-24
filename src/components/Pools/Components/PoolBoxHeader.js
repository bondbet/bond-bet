import React from 'react'

const PoolBoxHeader = ({ title }) => {
    const createHeaderLines = (n) => {
        var html = [];
        for (let i = 0; i < n; i++) {
            html.push(<div key={i}></div>);
        }
        return html;
    }
    return (
        <div className='pools-box-header'>
            <div className='pools-box-header-text-left-lines'>
                {createHeaderLines(6)}
            </div>
            <div className='pools-box-header-text'>{title}</div>
            <div className='pools-box-header-text-right-lines'>
                {createHeaderLines(6)}
            </div>
        </div>
    )
}

export default PoolBoxHeader
