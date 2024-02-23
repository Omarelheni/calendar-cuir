import React, { useEffect, useState } from "react"


const OnlyBar = ({counter,last = 6}) => {

    return (
        <div className="segmented-bar-container">

        <div className="segmented-bar">
        {[...Array(counter)].map((_, index) => (
          <div
            key={index}
            className={`segmented-bar__segment  ${index === 0 ? 'first' : ''} ${index === last? 'last' : ''}`}
          />
        ))}
      </div>
      </div>
    )

}
export default OnlyBar