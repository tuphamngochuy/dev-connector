import React from "react";

const Alert = ({ message }) => {
  return <div className={message !== '' ? 'alert alert-danger' : 'disabled'}>
    { message }
  </div>
}

export default Alert