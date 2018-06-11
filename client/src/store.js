import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'
// middlewares
import logger from './middlewares/logger'

// Initial state
const initialState = {
  error: '',
  isFetching: false,
  products: [],
}

const enhancers = []
const middleware = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
  const devToolsExtension = window.devToolsExtension // eslint-disable-line prefer-destructuring

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const store = createStore(
  products,
  initialState,
  composedEnhancers,
)

export default store
