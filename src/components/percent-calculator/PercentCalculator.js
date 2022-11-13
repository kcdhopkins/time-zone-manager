import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./styles/percent-calculator.css";
const PercentCalculator = ({
  showPercentCalculator,
  setShowPercentCalculator,
}) => {

    const [showValue, setShowValue] = useState(false)
    const [numberValue, setNumberValue] = useState("")
    const [percentOffValuE, setPercentOffValue] = useState("")
    const [discountPrice, setDiscountPrice] = useState(0)
    const [displayPercentOff, setDisplayPercentOff] = useState("")
    const [displayNumberValue, setDisplayNumberValue] = useState(0)
    const [difference, setDifference] = useState(0)

    const calculatePercentage = (e)=>{
        e.preventDefault()
        const discount = (numberValue * (1 - (percentOffValuE / 100).toFixed(2))).toFixed(2)
        const total = (numberValue - discount).toFixed(2)
        setDifference(total)
        setDiscountPrice(discount)
        setDisplayPercentOff(percentOffValuE)
        setDisplayNumberValue(numberValue)
        setShowValue(true)
    }
  return (
    <>
      <div className='overlay'></div>
      <form className='formStyles' onSubmit={(e)=>calculatePercentage(e)} style={{ height: "100%" }}>
        <div className='customCard'>
          <h1>Percent Off Calculator</h1>
          <h3>Discount Price = Original Price * (1 - percent value) </h3>
          <div className='input-body-percent'>
            <div className="inputs-labels">
              <div className='input-fields-percent'>
                <label htmlFor='number'>Number: </label>
                <input name="number" type="number" onChange={(el)=>setNumberValue(el.target.value)} value = {numberValue}/>
              </div>
              <div className='input-fields-percent'>
                <label htmlFor='percent-off'>Percent Off: </label>
                <input  name="percent-off" type="number" onChange={(el)=>setPercentOffValue(el.target.value)} value = {percentOffValuE}/>
              </div>
            </div>
            </div>
          <div className="button-percent">
                <Button type="submit" style={{margin: "2px"}} variant="contained" color = "primary" size="small">
                                            Calculate Percent Off
                </Button>
                <Button style={{margin: "2px"}} variant="contained" color = "primary" size="small" onClick={() => setShowPercentCalculator(false)}>
                                            Close
                </Button>
            </div>
            {showValue && 
                (<div className="show-values">
                    <span>{`${displayPercentOff}% off $${displayNumberValue} is $${discountPrice}`}</span><br />
                    <span>The difference is ${`${difference} `}</span>
                </div>)
            }
        </div>
      </form>
    </>
  );
};

export default PercentCalculator;
