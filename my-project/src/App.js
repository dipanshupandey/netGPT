import React from 'react'
import { Provider } from 'react-redux'
import store from './utils/appStore'
import Body from './components/Body'

const App = () => {
  return (
    <div>
      <Provider store={store}>      
      <Body/>
      </Provider>
    </div>
  )
}

export default App