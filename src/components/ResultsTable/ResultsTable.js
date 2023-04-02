import './style.sass'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
const ResultsTable = () => {
  const lastResult = useSelector(state => state.slice.lastResult);
  const [title, setTitle] = useState("");
  const [animation, setAnimation] = useState(false);
  const defaultStyle = {
    transitionDuration: `700ms`,
    transform: 'translateY(-30%)',
    opacity: 0,
  }
  const transitionStyles = {
    entering:
    {
      opacity: 0
    },
    entered: {
      opacity: 1,
      transform: 'translateY(0%)'
    }
    ,
    exiting: {
      opacity: 0
    },
    exited: {
      opacity: 0,
      transform: 'translateY(-30%)'
    }
  };
  useEffect(() => {
    const winTitle = lastResult.data === 'win' ? 'YOU WON' : '';
    const lossTitle = lastResult.data === 'loss' ? 'YOU LOSE' : '';
    const draftTitle = lastResult.data === 'draft' ? 'DRAFT' : '';
    setTitle(winTitle || lossTitle || draftTitle);
    setAnimation(true);
    setTimeout(() => { setAnimation(false) }, 3000);
    setTimeout(() => { setTitle("") }, 5000);
  }, [lastResult])
  return (
    <section className={`results-table ${lastResult.data}`}>
      <Transition timeout={0} in={animation} appear>
        {state => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            {title}
          </div>
        )}
      </Transition>
    </section>
  )
}
export default ResultsTable;
