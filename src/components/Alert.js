import React from 'react'

export default function Alert(props) {

  const toCapatilized = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <div style={{height:'50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{toCapatilized(props.alert.type)}!</strong> {props.alert.message}
      </div>}
      </div>
  )
}
