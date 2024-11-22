import { createContext, useReducer } from 'react';

// Initial state with DEMO_MODE as default
const initialState = {
  mode: 'DEMO_MODE', // Default mode is DEMO_MODE
};

const actionTypes = {
  SET_DEMO_MODE: 'SET_DEMO_MODE',
  SET_LIVE_MODE: 'SET_LIVE_MODE',
};

const modeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DEMO_MODE:
      return { ...state, mode: 'DEMO_MODE' };
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