import React from 'react';

const AppContext = React.createContext({
  user: {},
  setUser(user) {
    this.user = user;
  }
});

export default AppContext;
