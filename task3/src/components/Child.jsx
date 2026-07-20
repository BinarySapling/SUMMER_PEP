import React from 'react'

const Child = React.memo(({ handleClick }) => {
  console.log("Second Child Rendered");
  return (
    <div>
      <p>This is the second child </p>
      <button onClick={handleClick}>Child Button</button>
    </div>
  )
})

export default Child
