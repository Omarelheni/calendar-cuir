import React,{useState} from 'react';
import OnlyBar from './onlyBar';
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

const SegmentedBar = ({counters,setCounters,name}) => {
    const onIncrement = ()=>{
      console.log({...counters,[name]:counters[name]+1})
      if (counters[name] < 7 & 16 > sumValues(counters)){
        setCounters({...counters,[name]:counters[name]+1})
      }
    }
    const onDecrement = ()=>{
      if (counters[name] > 0 & 0 < sumValues(counters)){
      setCounters({...counters,[name]:counters[name]-1})
      }
    }
    return (
      <div className="all-container">
            <button className="segmented-bar__button" onClick={onDecrement}>-</button>
          <OnlyBar counter={counters[name]}/>
          <button className="segmented-bar__button" onClick={onIncrement}>+</button>
          </div>
      );
    };
  
  export default SegmentedBar;