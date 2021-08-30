import { createContext, useReducer } from "react";
import { reducer } from "./reducer";


export const initialState = {
    adminMenuOpen: false,
    shelvesMenuExpanded: true,
    sideMenuSelection: undefined,
    addShelfModalOpen: false,
    perPage: 25,
    nextPage: undefined,
    changeUserModalOpen: false
};

const LayoutContext = createContext(initialState);

const LayoutProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <LayoutContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </LayoutContext.Provider>
    )
};

export { LayoutProvider, LayoutContext };





