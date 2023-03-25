import React from 'react'

function DetailBodyText({ title, body } : { title : string, body : string | null}) {
  return (
    <div className='mb-3'>
        <h5 className="text-sm font-semibold">{title}</h5>
        <h5>{body ? body : '-'}</h5>
    </div>
  )
}

export default DetailBodyText