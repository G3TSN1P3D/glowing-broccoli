import React, { useState } from 'react'
import home from '../images/at-bat.png'
import first from '../images/on-first.png'
import second from '../images/on-second.png'
import third from '../images/on-third.png'



export default function RecordGame() {
    const [base, setBase] = useState(0)
    const [balls, setBalls] = useState(0)
    const [strikes, setStrikes] = useState(0)
    const [stats, setStats] = useState({
        "inning": 1,
        "order": 1,
        "balls": 0,
        "strikes": 0,
        "rbi": 0,
        "run": false,
        "stolen_base": 0,
        "result": ''
    })

    
    // Set the image to run this function so it updates with the base,
    // had some issues with the image loading 
    function changeField(curBase) {
        if (curBase === 0) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={home} alt='At bat'/>
                </div>
            )
        }
        if (curBase === 1) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={first} alt='On first'/>
                </div>
            )
        }
        if (curBase === 2) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={second} alt='On second'/>
                </div>
            )
        }
        if (curBase === 3) {
            return (
            <div className='bg-dark d-flex justify-content-center'>
                <img src={third} alt='On third'/>
            </div>
            )
        }
        if (curBase > 3) {
            setBase(0)
            // set run to true if base is greater than 3
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={home} alt='At bat'/>
                </div>
            )
        }
    }
    
    function generateButtons(curBase) {
        if (curBase === 0) {
            return (
                <div>
                    <div>
                        Count: {balls} - {strikes}
                    </div>
                    <div>
                        Object Count: {stats.balls} - {stats.strikes}
                    </div>
                    <div className='row m-1'>
                        <button className='btn btn-primary col m-1' onClick={addBall}>Ball</button>
                        <button className='btn btn-primary col m-1' onClick={addStrike}>Strike</button>
                        <div className='w-100'></div>
                        <button className='btn btn-primary col m-1'>Hit</button>
                        <button className='btn btn-primary col m-1'>Out</button>
                    </div>
                </div>
            )
        }
    }

    function addBase() {
        setBase(prevBase => prevBase + 1)
    }
    
    function addBall() {
        setBalls(prevBalls => prevBalls + 1)
        const ballCount = {balls: balls}
        setStats(oldStats => ({
            ...oldStats,
            ...ballCount
        }))
        // if balls = 4 => Walk
        if(balls === 4) {
            addBase()
            console.log(base)
            setBalls(0)
        }
    }
    
    function addStrike() {
        setStrikes(prevStrikes => prevStrikes + 1)
        const strikeCount = {strikes: strikes}
        setStats(oldStats => ({
            ...oldStats,
            ...strikeCount
        }))
        // if strikes = 3 => strikeout
        if(strikes === 3) {
            setStrikes(0)
        }
    }
    const fieldDisplay = changeField(base)
    const buttonDisplay = generateButtons(base)

    return (
        <main className='m-1'>
            {fieldDisplay}
            {buttonDisplay}
        </main>
    )
}
