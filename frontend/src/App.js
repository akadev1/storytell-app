import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editor from './components/Editor';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {isAuthenticated ? (
          <>
            <Route path="/editor" component={Editor} />
            <Route path="/stories/:id" component={StoryViewer} />
            <Route path="/" component={StoryList} />
          </>
        ) : (
          <Route path="/" component={Login} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
