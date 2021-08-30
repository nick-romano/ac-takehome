import { createContext, useReducer } from "react";
import { reducer } from "./reducer";


export const initialState = {
    user: "blacklight"
};

const AdminContext = createContext(initialState);

const AdminProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <AdminContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </AdminContext.Provider>
    )
};

export { AdminProvider, AdminContext };





