import type { Middleware, Dispatch } from "redux";

// Définir le type d’une fonction thunk
type ThunkAction = (dispatch: Dispatch, getState: () => any) => any;

// Middleware Redux typé
const thunkMiddleware: Middleware = ({ dispatch, getState }) => (next) => (action: any | ThunkAction) => {
    if (typeof action === "function") {
      return action(dispatch, getState); // appel du thunk
    }
    return next(action); // passage à l'action suivante
};

export default thunkMiddleware;
