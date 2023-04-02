import { useState, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { clearScore, addDoubleWin, addDoubleLoss } from '../GameTable/slice';
import { ReactComponent as Rules } from '../../icons/image-rules.svg';
import { ReactComponent as Ruby } from '../../icons/ruby.svg';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.sass';
function CustomToggle({ children, handleModalShow }) {
  const [accordionState, setAccordionState] = useState(false);
  const ruby = useRef()
  const decoratedOnClick = useAccordionButton();
  const handleClick = () => {
    setAccordionState(!accordionState);
    decoratedOnClick()
  }
  const hasPointer = window.matchMedia('(pointer: fine)').matches;
  return (
    <>
      <button className={`result-settings ${accordionState ? 'active' : ''}`}
        onMouseEnter={(e) => hasPointer ? e.target.classList.add('hover') : null}
        onMouseLeave={(e) => hasPointer ? e.target.classList.remove('hover') : null}
        onClick={handleClick}
      >
        {children}
      </button>
      <Ruby ref={ruby} className='ruby'
        style={{ transform: accordionState ? 'rotate(90deg)' : 'none' }} />
      <Button className='rules'
        onClick={handleModalShow}
        onMouseEnter={(e) => hasPointer ? e.target.classList.add('hover') : null}
        onMouseLeave={(e) => hasPointer ? e.target.classList.remove('hover') : null}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Rules
      </Button>
    </>
  );
}
const RulesAndSettings = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const doubleWin = useSelector(state => state.slice.doubleWin);
  const doubleLoss = useSelector(state => state.slice.doubleLoss);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  const hasPointer = window.matchMedia('(pointer: fine)').matches;
  return (
    <section className="rules-settings">
      <Accordion defaultActiveKey="0">
        <Card className='card'>
          <Card.Header className='card-header'>
            <CustomToggle handleModalShow={handleModalShow}>Result settings</CustomToggle>
          </Card.Header>
          <Accordion.Collapse  >
            <Card.Body className='card-body'>
              <button className='clear'
                onMouseEnter={(e) => hasPointer ? e.target.classList.add('hover') : null}
                onMouseLeave={(e) => hasPointer ? e.target.classList.remove('hover') : null}
                onClick={() => { dispatch(clearScore()) }}>
                Clear
              </button>
              <button className={`double-win ${doubleWin ? 'active' : ''}`}
                onMouseEnter={(e) => hasPointer ? e.target.classList.add('hover') : null}
                onMouseLeave={(e) => hasPointer ? e.target.classList.remove('hover') : null}
                onClick={() => { dispatch(addDoubleWin()) }}>
                Double win
              </button>
              <button className={`double-loss ${doubleLoss ? 'active' : ''}`}
                onMouseEnter={(e) => hasPointer ? e.target.classList.add('hover') : null}
                onMouseLeave={(e) => hasPointer ? e.target.classList.remove('hover') : null}
                onClick={() => { dispatch(addDoubleLoss()) }}>
                Double loss
              </button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Modal show={show} onHide={handleModalClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rules />
        </Modal.Body>
      </Modal>
    </section >
  )
}
export default RulesAndSettings;
