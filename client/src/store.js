import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'

// Initial state
const initialState = {
  products: {},
  sort: {
    sortOrder: 'POPULARITY',
    sortType: 'desc',
  },
}

const enhancers = []
const middleware = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
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
console.log('store', store.getState())
export default store
