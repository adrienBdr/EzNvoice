import React from 'react';

const AppContext = React.createContext({
  user: {},
  isCompaniesModified: false,
  isProductsModified: false,
  isClientsModified: false,
  isInvoicesModified: false,
  setUser(user) {
    this.user = user;
  },
  setIsCompaniesModified(value) {
    this.isCompaniesModified = value;
  },
  setIsProductsModified(value) {
    this.isProductsModified = value;
  },
  setIsClientsModified(value) {
    this.isClientsModified = value;
  },
  setIsInvoicesModified(value) {
    this.isInvoicesModified = value;
  }
});

export default AppContext;
