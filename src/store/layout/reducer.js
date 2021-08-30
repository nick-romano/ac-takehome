
export const reducer = (state, action) => {
    switch(action.type) {
        case "setAdminMenuOpen":
            return {
                ...state,
                adminMenuOpen: action.menuOpen
            }
        case "setSideMenuSelection": {
            return {
                ...state,
                sideMenuSelection: action.id
            }
        }
        case "setShelvesMenuExpanded":
            return {
                ...state,
                shelvesMenuExpanded: action.shelvesMenuExpanded
            }
        case "setAddShelfModalOpen":
            return {
                ...state,
                addShelfModalOpen: action.addShelfModalOpen
            }
        case "setNextPage":
            return {
                ...state,
                nextPage: action.nextPage
            }
        case "setChangeUserModalOpen":
            return {
                ...state,
                changeUserModalOpen: action.changeUserModalOpen
            }
        default:
            throw new Error("Unknown action type provided to admin reducer");
    }
}

