import React from 'react';

const AppContext = React.createContext({
  user: {},
  isCompaniesModified: false,
  setUser(user) {
    this.user = user;
  },
  setIsCompaniesModified(value) {
    this.isCompaniesModified = value;
  }
});

export default AppContext;
