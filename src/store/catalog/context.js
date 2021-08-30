import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const initialState = {  
};

const CatalogContext = createContext(initialState); 

const CatalogProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CatalogContext.Provider
            value={{
                shelves: state,
                dispatch
            }}
        >
            {children}
        </CatalogContext.Provider>
    )

};

export { CatalogContext, CatalogProvider };