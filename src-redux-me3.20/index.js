import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import App from './App'
import {counter} from './index.redux'

const store=createStore(counter)

const render = ()=>(ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
)
)
render();
store.subscribe(render)







// import React from 'react';
// import ReactDom from 'react-dom';
// import { createStore,applyMiddleware ,compose} from 'redux';
// import thunk from 'redux-thunk';//引入applyMiddleware中间件 处理异步请求
// import {Provider} from 'react-redux'

// import App from './App';
// import { counter } from './index.redux';
// //使用redux-devtools,先判断有无devToolsExtension
// const reduxDevtools=window.devToolsExtension?window.devToolsExtension:()=>{};
// const store=createStore(counter,compose(
//     applyMiddleware(thunk),reduxDevtools()
// ))
//     ReactDom.render(
//         <Provider store={store}>
//             <App />
//         </Provider>,
//      document.getElementById('root')
//     )