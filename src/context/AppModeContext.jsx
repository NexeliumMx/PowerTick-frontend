import { createContext, useReducer } from 'react';

// Initial state with dynamic mode based on environment
const initialState = {
  mode: process.env.NODE_ENV === 'development' ? 'DEV_MODE' : 'LIVE_MODE', // Automatically set mode
};

const actionTypes = {
  SET_DEMO_MODE: 'SET_DEMO_MODE',
  SET_DEV_MODE: 'SET_DEV_MODE',
  SET_LIVE_MODE: 'SET_LIVE_MODE',
};

const modeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DEMO_MODE:
      return { ...state, mode: 'DEMO_MODE' };
    case actionTypes.SET_DEV_MODE:
      return { ...state, mode: 'DEV_MODE' };
    case actionTypes.SET_LIVE_MODE:
      return { ...state, mode: 'LIVE_MODE' };
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