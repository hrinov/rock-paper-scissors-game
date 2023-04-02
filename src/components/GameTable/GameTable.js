import { useState, useEffect, useRef } from 'react';
import { ReactComponent as Rock } from '../../icons/icon-rock.svg';
import { ReactComponent as Paper } from '../../icons/icon-paper.svg';
import { ReactComponent as Scissors } from '../../icons/icon-scissors.svg';
import { useDispatch } from 'react-redux';
import { addScoreWin, addScoreLoss, addLastResult } from './slice';
import { ReactComponent as Ruby } from '../../icons/ruby.svg';
import './style.sass';
const GameTable = () => {
  const sound = new Audio('https://www.fesliyanstudios.com/play-mp3/5269');
  sound.volume = 0.3;
  const [extraItemData, setExtraItemData] = useState(null);
  const gameTable = useRef();
  const rockItem = useRef();
  const paperItem = useRef();
  const scissorsItem = useRef();
  const extraItem = useRef();
  const firstRuby = useRef();
  const secondRuby = useRef();
  const thirdRuby = useRef();
  const dispatch = useDispatch();
  const rockPosition = 'translate(83%, 25%)';
  const paperPosition = 'translate(-141%, 25%)';
  const scissorsPosition = 'translate(-24%, -149%)';
  const eventListener = (event) => {
    addRemoveEventListener('remove');
    event.preventDefault();
    extraItem.current.style.zIndex = '1';
    startGame(event.target.closest('div'));
  };
  const addRemoveEventListener = (type) => {
    const items = [rockItem.current, paperItem.current, scissorsItem.current];
    items.forEach((item) => {
      if (type === 'add') {
        item.addEventListener('click', eventListener, { once: true });
      } else {
        item.removeEventListener('click', eventListener);
      }
    });
  };
  const itemsTakeUpPositions = () => {
    const items = [rockItem.current, paperItem.current, scissorsItem.current];
    const animate = (item, transform) => {
      return new Promise((resolve) => {
        item.animate([
          {
            filter: 'brightness(30%)'
          },
          {
            filter: 'brightness(100%)'
          },
        ], {
          duration: 700,
          delay: 800,
          easing: 'cubic-bezier(0.5, 0.5, 0.4, 1)',
          iterations: 1
        }
        );
        const animation = item.animate([
          {
            transform: `${transform} rotate(-45deg)`,
            filter: 'brightness(30%)'
          },
          {
            transform: 'translate(-25%, -25%) rotate(0deg)',
          },
        ], {
          duration: 1500,
          easing: 'cubic-bezier(0.5, 0.5, 0.4, 1)',
          iterations: 1
        }
        );
        animation.finished.then(() => {
          item.style.transform = 'translate(-25%, -25%) rotate(0deg)';
          item.style.filter = 'brightness(100%)';
          resolve()
        });
      });
    }
    new Promise((resolve) => {
      const promises = [];
      items.forEach((item) => {
        switch (item) {
          case items[0]:
            promises.push(animate(item, rockPosition));
            break;
          case items[1]:
            promises.push(animate(item, paperPosition));
            break;
          case items[2]:
            promises.push(animate(item, scissorsPosition));;
            break;
        }
      });
      Promise.all(promises).then(() => { resolve(); })
    }).then(() => {
      extraItem.current.style.zIndex = '1';
      addRemoveEventListener('add');
    });
  };
  const startGame = (userSelectedItem) => {
    const items = [rockItem.current, paperItem.current, scissorsItem.current];
    const notSelectedItems = items.filter((item) => {
      return item !== userSelectedItem
    });
    const rockShadow = window.getComputedStyle(items[0]).boxShadow;
    const paperShadow = window.getComputedStyle(items[1]).boxShadow;
    const scissorsShadow = window.getComputedStyle(items[2]).boxShadow;
    new Promise((resolve) => {
      const promises = [];
      notSelectedItems.forEach((item) => {
        const changeBrightness = item.animate([
          { filter: 'brightness(100%)' },
          { filter: 'brightness(30%)' },
        ], {
          duration: 1000,
          iterations: 1
        });
        promises.push(changeBrightness.finished.then(() => {
          item.style.filter = 'brightness(30%)';
        }));
      });
      Promise.all(promises).then(() => {
        resolve();
      });
    }).then(() => {
      new Promise((resolve) => {
        const animate = (transform, shadowType) => {
          userSelectedItem.style.boxShadow = shadowType;
          userSelectedItem.style.filter = 'brightness(30%)';
          extraItem.current.style.boxShadow = 'none';
          extraItem.current.style.transform = 'translate(-25%, -25%) rotate(0deg)';
          const animation = extraItem.current.animate([
            { transform: 'translate(-25%, -25%) rotate(0deg)' },
            { transform: `${transform} rotate(-45deg)` },
          ], {
            duration: 750,
            iterations: 1
          });
          animation.finished.then(() => {
            extraItem.current.style.transform = `${transform} rotate(-45deg)`;
            extraItem.current.style.zIndex = '-1';
            resolve()
          });
        }
        switch (userSelectedItem) {
          case items[0]:
            setExtraItemData({
              name: 'rock',
              class: 'item rock',
              img: <Rock />
            });
            animate(rockPosition, rockShadow);
            break;
          case items[1]:
            setExtraItemData({
              name: 'paper',
              class: 'item paper',
              img: <Paper />
            });
            animate(paperPosition, paperShadow);
            break;
          case items[2]:
            setExtraItemData({
              name: 'scissors',
              class: 'item scissors',
              img: <Scissors />
            });
            animate(scissorsPosition, scissorsShadow);
            break;
        }
      }).then(() => {
        new Promise((resolve) => {
          const rubies = [firstRuby.current, secondRuby.current, thirdRuby.current];
          rubies.forEach((element) => { element.style.display = 'block' })
          const animate = (j) => {
            const topIndent = ['-50%', '0%', '90%', '-50%', '90%', '0%'];
            const leftIndent = ['0%', '-50%', '-50%', '90%', '-50%', '-50%'];
            rubies[j].animate([
              {
                left: leftIndent[j],
                top: topIndent[j]
              },
              {
                left: leftIndent[j + 3],
                top: topIndent[j + 3],
                transform: 'rotate(180deg)'
              }
            ], {
              duration: 550,
              iterations: 1
            });
          }
          const randomInteger = (min, max) => {
            const rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
          }
          let randomNumber = randomInteger(10, 15);
          let itemNumber = 0;
          let nextNumber = (number) => {
            if (number < 2) { ++itemNumber } else {
              itemNumber = 0
            }
            return itemNumber
          }
          function recursion(i, j) {
            setTimeout(() => { items[j].style.filter = 'brightness(70%)' }, 170);
            animate(j)
            setTimeout(() => { items[j].style.filter = 'brightness(30%)' }, 550);
            randomNumber -= 1;
            let itemNumber = nextNumber(j);
            setTimeout(() => {
              if (i > 1) {
                recursion(randomNumber, itemNumber)
              } else {
                setTimeout(() => {
                  rubies.forEach((element) => { element.style.display = 'none' })
                  items[itemNumber].style.filter = 'brightness(100%)'
                  items[itemNumber].style.boxShadow = 'none';
                  items[itemNumber].style.transitionDuration = '0.8s';
                  items[itemNumber].style.transform = "translate(-25%, -21%)";
                  sound.play();
                  resolve(itemNumber);
                }, 170);
              }
            }, 370);
          }
          setTimeout(() => { recursion(randomNumber, itemNumber); }, 400);
        }).then((computerSelectedItem) => {
          new Promise((resolve) => {
            setTimeout(() => {
              if (userSelectedItem === items[0] && computerSelectedItem === 2) {
                dispatch(addScoreWin())
                dispatch(addLastResult('win'))
              }
              else if (userSelectedItem === items[0] && computerSelectedItem === 1) {
                dispatch(addScoreLoss())
                dispatch(addLastResult('loss'))
              }
              else if (userSelectedItem === items[0]) {
                dispatch(addLastResult('draft'))
              };
              if (userSelectedItem === items[1] && computerSelectedItem === 0) {
                dispatch(addScoreWin())
                dispatch(addLastResult('win'))
              } else if (userSelectedItem === items[1] && computerSelectedItem === 2) {
                dispatch(addScoreLoss())
                dispatch(addLastResult('loss'))
              } else if (userSelectedItem === items[1]) {
                dispatch(addLastResult('draft'))
              };
              if (userSelectedItem === items[2] && computerSelectedItem === 1) {
                dispatch(addScoreWin())
                dispatch(addLastResult('win'))
              }
              else if (userSelectedItem === items[2] && computerSelectedItem === 0) {
                dispatch(addScoreLoss())
                dispatch(addLastResult('loss'))
              }
              else if (userSelectedItem === items[2]) {
                dispatch(addLastResult('draft'))
              };
              resolve()
            }, 1000);
          });
        }).then(() => {
          new Promise((resolve) => {
            setTimeout(() => {
              items.forEach((item) => {
                item.style.transitionDuration = 'unset';
              });
              let promises = [];
              const animate = (item, transform) => {
                const animation = item.animate([
                  { transform: 'translate(-25%, -25%) rotate(0deg)' },
                  {
                    transform: `${transform} rotate(-45deg)`,
                    filter: 'brightness(30%)'
                  },], {
                  duration: 1700,
                  easing: 'cubic-bezier(0.5, 0.5, 0.4, 1)',
                  iterations: 1
                });
                promises.push(animation.finished.then(() => {
                  item.style.transform = `${transform} rotate(-45deg)`;
                  item.style.filter = 'brightness(30%)';
                }));
              }
              items.forEach((item) => {
                switch (item) {
                  case items[0]:
                    animate(item, rockPosition);
                    break;
                  case items[1]:
                    animate(item, paperPosition);
                    break;
                  case items[2]:
                    animate(item, scissorsPosition);
                    break;
                }
              });
              Promise.all(promises).then(() => {
                setExtraItemData(null);
                resolve();
              });
            }, 3000);
          }).then(() => {
            new Promise(() => {
              items[0].style.boxShadow = rockShadow;
              items[1].style.boxShadow = paperShadow;
              items[2].style.boxShadow = scissorsShadow;
              itemsTakeUpPositions();
            });
          });
        });
      });
    });
  }
  useEffect(() => {
    setTimeout(() => { itemsTakeUpPositions() }, 200)
  }, []);
  return (
    <section className="game-table" ref={gameTable}>
      <div className="a-line" >
        <Ruby ref={firstRuby} />
      </div>
      <div className="c-line" >
        <Ruby ref={thirdRuby} />
      </div>
      <div className="b-line">
        <Ruby ref={secondRuby} />
      </div>
      <div className="item rock" ref={rockItem}>
        <Rock />
      </div>
      <div className="item paper" ref={paperItem}>
        <Paper />
      </div>
      <div className="item scissors" ref={scissorsItem}>
        <Scissors />
      </div>
      <div
        className={extraItemData ? extraItemData.class : null}
        ref={extraItem}>
        {extraItemData ? extraItemData.img : null}
      </div>
    </section >
  )
}
export default GameTable;
