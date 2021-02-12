import React from 'react';
import './App.css';
import ScreenHome from './ScreenHome';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

import articleList from './reducers/article.reducer';
import tokenName from './reducers/token.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({articleList, tokenName}));


function App() {
  return (
    <Provider store={store}>
    <Router>
       <Switch>
       <Route exact component={ScreenHome} path="/" />
         <Route exact component={ScreenMyArticles} path="/screenmyarticles" />
         <Route exact component={ScreenSource} path="/screensource" />
         <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" />
       </Switch>
     </Router>
     </Provider>
  );
}

export default App;
