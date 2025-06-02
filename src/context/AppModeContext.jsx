/**
 * FileName: src/context/AppModeContext.jsx
 * Author(s): Arturo Vargas
 * Brief: Provides the context for managing application modes (DEMO, DEV, PRODUCTION).
 * Date: 2025-06-01
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { createContext, useReducer } from 'react';

// Initial state with DEMO as default
const initialState = {
  mode: 'DEMO', // Default mode is DEMO
};

const actionTypes = {
  SET_DEMO: 'SET_DEMO',
  SET_DEV: 'SET_DEV',
  SET_PRODUCTION: 'SET_PRODUCTION',
};

const modeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DEMO:
      return { ...state, mode: 'DEMO' };
    case actionTypes.SET_DEV:
      return { ...state, mode: 'DEV' };
    case actionTypes.SET_PRODUCTION:
      return { ...state, mode: 'PRODUCTION' };
    default:
      return state;
  }
};

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modeReducer, initialState);

  return (
    <ModeContext.Provider value={{ state, dispatch }}>
      {children}
    </ModeContext.Provider>
  );
};