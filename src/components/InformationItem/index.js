import * as React from 'react'

export default function InformationItem({ fieldName, field }) {
  return <div>
    <span style={{ fontWeight: 600}}>{`${fieldName}:  `}</span>
    <span>{field}</span>
  </div>
}