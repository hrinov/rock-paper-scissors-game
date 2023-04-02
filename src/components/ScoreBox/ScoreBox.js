import './style.sass';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import { ReactComponent as StickerX2 } from '../../icons/sticker.svg';
const ScoreBox = () => {
  const scoreWin = useSelector(state => state.slice.scoreWin);
  const scoreLoss = useSelector(state => state.slice.scoreLoss);
  const [activeState, setActiveState] = useState(false);
  const lastResult = useSelector(state => state.slice.lastResult);
  const doubleWin = useSelector(state => state.slice.doubleWin);
  const doubleLoss = useSelector(state => state.slice.doubleLoss);
  const defaultStyle = {
    transitionDuration: `700ms`,
    opacity: 0,
  }
  const transitionStyles = {
    entering:
    {
      opacity: 0
    },
    entered: {
      opacity: 1,
      transform: 'translateY(-60px) rotate(30deg)'
    }
    ,
    exiting: {
      opacity: 0,
      transform: 'rotate(90deg) translateY(-50px) translateX(-50px)'
    },
    exited: {
      opacity: 0,
      transform: 'rotate(90deg) translateY(-50px) translateX(-50px)'
    }
  };
  useEffect(() => {
    setActiveState(true);
    setTimeout(() => { setActiveState(false) }, 3000)
  }, [lastResult])
  return (
    <section className="score-box">
      <div className="wrapper">
        <div className="game-name">
          ROCK <br />
          PAPER<br />
          SCISSORS<br />
        </div>
        <div className={`first-score-table ${activeState && lastResult.data === 'win' ? 'active' : null}`}>
          <Transition in={doubleWin} timeout={100} >
            {state => (
              <div className='sticker-x2'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              ><StickerX2 />
              </div>
            )}
          </Transition>
          <div className="title">WIN</div>
          <div className="score" >{scoreWin}</div>
        </div>
        <div className={`second-score-table ${activeState && lastResult.data === 'loss' ? 'active' : null}`}>
          <Transition in={doubleLoss} timeout={100} >
            {state => (
              <div className='sticker-x2'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              ><StickerX2 />
              </div>
            )
            }
          </Transition >
          <div className="title">LOSS</div>
          <div className="score">{scoreLoss}</div>
        </div >
      </div >
    </section >
  )
}
export default ScoreBox;
