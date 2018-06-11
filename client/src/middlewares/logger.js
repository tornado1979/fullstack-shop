export default function createLogger({ getState }) {
  return next =>
    (action) => {
      const console = window.console// eslint-disable-line prefer-destructuring
      const prevState = getState()
      const returnValue = next(action)
      const nextState = getState()
      console.log(`%c prev state`, `color: #9E9E9E`, prevState) // eslint-disable-line quotes
      console.log(`%c action`, `color: pink`, action)// eslint-disable-line quotes
      console.log(`%c next state`, `color: #4CAF50`, nextState)// eslint-disable-line quotes
      console.log(`%c next(action)`, `color: gold`, returnValue)// eslint-disable-line quotes
      return returnValue
    }
}
