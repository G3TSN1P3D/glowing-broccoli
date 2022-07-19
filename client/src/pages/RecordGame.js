import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import home from '../images/at-bat.png'
import first from '../images/on-first.png'
import second from '../images/on-second.png'
import third from '../images/on-third.png'
import { NEW_STAT } from '../utils/mutations'



export default function RecordGame() {
    const [base, setBase] = useState(0)
    const [balls, setBalls] = useState(0)
    const [strikes, setStrikes] = useState(0)
    const [status, setStatus]  = useState('at-bat')
    const [basesHit, setBasesHit] = useState(0)
    const [rbi, setRbi] = useState(0)
    const [countForAvg, setCountForAvg] = useState(true)
    const [steals, setSteals] = useState(0)
    const [run, setRun] = useState(false)
    // const [stats, setStats] = useState({
    //     "inning": 1,
    //     "order": 1,
    //     "balls": 0,
    //     "strikes": 0,
    //     "walk": false,
    //     "strikeout": false,
    //     "countForAverage": true,
    //     "basesHit": 0,
    //     "rbi": 0,
    //     "run": false,
    //     "stolen_base": 0,
    //     "result": ''
    // })
    
    const { playerId } = useParams();

    const [addStats, {error, data}] = useMutation(NEW_STAT);

    function addBase(baseNum) {
        setBase(prevBase => prevBase + baseNum)
        if (base === 3) {
            runScored()
        }
    }
    
    function addBall() {
        setBalls(prevBalls => prevBalls + 1)
        if(balls === 3) {
            addBase(1)
            setStatus('on-base')
        }
    }
    
    function addStrike() {
        setStrikes(prevStrikes => prevStrikes + 1)
        if(strikes === 2) {
            setStatus('strikeout')
        }
    }

    
    function addHit(bases) {
        setBasesHit(bases)
        addBase(bases)
        rbiCheck()
    }

    function addRbi(battedIn) {
        setRbi(battedIn)
        onBase()
    }
    
    function sacrifice() {
        setCountForAvg(false)
        rbiCheck()
    }

    function addSteal() {
        setSteals(oldSteals => oldSteals + 1)
        addBase(1)
    }

    function runScored() {
        setRun(true)
        endOfSequence()
        console.log('Run Scored')
    }

    function homeRun() {
        setStatus('home-run')
        setRun(true)
        setBasesHit(4)    
    }

    function hrRuns(rbiCount) {
        setRbi(rbiCount)
        endOfSequence()
    }

    function goToHit() {
        setStatus('hit')
    }

    
    function rbiCheck() {
        setStatus('rbi-check')
    }
    
    function onBase() {
        setStatus('on-base')
    }
    
    function endOfSequence() {
        logStats()
        setStatus('end-of-sequence')
    }

    function nextAB() {
        window.location.reload()
    }

    async function logStats() {
        setTimeout(async function(){
                try {
                    const { data } = await addStats({
                        variables: {
                            playerId: playerId,
                            inning: 1,
                            order: 1,
                            balls: balls,
                            strikes: strikes,
                        rbi: rbi,
                        run: run,
                        stolen_base: steals,
                        result: 'Test'
                    }
                })
            } catch(e) {
                console.error(e)
            }
        },2000)
    } 

    function endGame() {
        setStatus('game-over')
    }

    // Set the image to run this function so it updates with the base,
    // had some issues with the image loading 
    function changeField(curBase) {
        if (curBase === 0) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={home} alt='At bat' className=' col-12' style={{maxWidth: "30rem"}}/>
                </div>
            )
        }
        if (curBase === 1) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={first} alt='On first' className=' col-12' style={{maxWidth: "30rem"}}/>
                </div>
            )
        }
        if (curBase === 2) {
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={second} alt='On second' className=' col-12' style={{maxWidth: "30rem"}}/>
                </div>
            )
        }
        if (curBase === 3) {
            return (
            <div className='bg-dark d-flex justify-content-center'>
                <img src={third} alt='On third' className=' col-12' style={{maxWidth: "30rem"}}/>
            </div>
            )
        }
        if (curBase > 3) {
            setBase(0)
            // set run to true if base is greater than 3
            return (
                <div className='bg-dark d-flex justify-content-center'>
                    <img src={home} alt='At bat' className=' col-12' style={{maxWidth: "30rem"}}/>
                </div>
            )
        }
    }
    
    function generateButtons() {
        console.log(status === 'hit')
        if (status === 'at-bat') {
            return (
                <div>
                    <div className='d-flex justify-content-center'>
                        <h3>
                            {balls} - {strikes}
                        </h3>
                    </div>
                    <div className='row m-1'>
                        <button className='btn btn-primary col m-1' onClick={addBall}>Ball</button>
                        <button className='btn btn-primary col m-1' onClick={addStrike}>Strike</button>
                        <div className='w-100'></div>
                        <button className='btn btn-primary col m-1' onClick={goToHit}>Hit</button>
                        <button className='btn btn-primary col m-1'>Out</button>
                    </div>
                </div>
            )
        }

        if (status === 'hit') {
            return (
                <div className='row m-1'>
                    <button className='btn btn-primary col m-1' onClick={() => addHit(1)}>Single</button>
                    <button className='btn btn-primary col m-1' onClick={() => addHit(2)}>Double</button>
                    <div className='w-100'></div>
                    <button className='btn btn-primary col m-1' onClick={() => addHit(3)}>Triple</button>
                    <button className='btn btn-primary col m-1' onClick={homeRun}>Home Run</button>
                    <div className='w-100'></div>
                    <button className='btn btn-primary col m-1' onClick={() => addBase(1)}>Fielders Choice</button>
                    <button className='btn btn-primary col m-1' onClick={sacrifice}>Sacrifice</button>
                </div>
            )
        }

        if (status === 'rbi-check') {
            return (
                <div>
                    <div className='d-flex justify-content-center'>
                        <h3>
                            How many runs batted in?
                        </h3>
                    </div>
                    <div className='row m-1'>
                        <button className='btn btn-primary col m-1' onClick={onBase}>0</button>
                        <button className='btn btn-primary col m-1' onClick={() => addRbi(1)}>1</button>
                        <button className='btn btn-primary col m-1' onClick={() => addRbi(2)}>2</button>
                        <button className='btn btn-primary col m-1' onClick={() => addRbi(3)}>3</button>
                        <button className='btn btn-primary col m-1' onClick={() => addRbi(4)}>4</button>

                    </div>
                </div>
            )
        }

        if (status === 'home-run') {
            return (
                <div>
                    <div className='d-flex justify-content-center'>
                        <h3>
                            HOME RUN! How many runs scored?
                        </h3>
                    </div>
                    <div className='row m-1'>
                        <button className='btn btn-primary col m-1' onClick={() => hrRuns(1)}>1</button>
                        <button className='btn btn-primary col m-1' onClick={() => hrRuns(2)}>2</button>
                        <div className='w-100'></div>
                        <button className='btn btn-primary col m-1' onClick={() => hrRuns(3)}>3</button>
                        <button className='btn btn-primary col m-1' onClick={() => hrRuns(4)}>4</button>

                    </div>
                </div>
            )
        }

        if (status === 'on-base') {
            return (
                <div className='row m-1'>
                    <button className='btn btn-primary col m-1' onClick={addSteal}>Stolen Base</button>
                    <button className='btn btn-primary col m-1' onClick={() => addBase(1)}>Advanced Base</button>
                    <div className='w-100'></div>
                    <button className='btn btn-primary col m-1' onClick={endOfSequence}>Thrown Out</button>
                    <button className='btn btn-primary col m-1' onClick={endOfSequence}>Inning Over</button>
                </div>
            )
        }

        if (status === 'end-of-sequence') {
            return (
                <div className='row m-1'>
                    <button className='btn btn-primary col m-1' onClick={nextAB}>Next At Bat</button>
                    <div className='w-100'></div>
                    <button className='btn btn-primary col m-1' onClick={endGame}>Game Over</button>
                </div>
            )
        }
    }


    const fieldDisplay = changeField(base)
    const buttonDisplay = generateButtons()
    console.log(steals)

    return (
        <main className='m-1'>
            {fieldDisplay}
            {buttonDisplay}
        </main>
    )
}
