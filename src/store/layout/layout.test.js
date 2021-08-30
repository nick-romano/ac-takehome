import { render } from '@testing-library/react';
import { reducer } from './reducer';
import { initialState } from './context';
import { LayoutProvider } from './context';

describe('testing layout store and reducer', () => {
    it('should update the state variable adminMenuOpen', () => {
        expect(initialState.adminMenuOpen).toBe(false);
        const state = reducer(initialState, {
            type: "setAdminMenuOpen",
            menuOpen: true
        });
        
        expect(state.adminMenuOpen).toBe(true);
    });

    it('should update shelvesMenuExpanded', () => {
        const state = reducer(initialState, {
            type: "setShelvesMenuExpanded",
            menuOpen: false
        });
        
        expect(state.adminMenuOpen).toBe(false);
    })

    it('should update AddShelfModalOpen', () => {
        const state = reducer(initialState, {
            type: "setAddShelfModalOpen",
            addShelfModalOpen: true
        });

        expect(state.addShelfModalOpen).toBe(true);
    })

    it('should update nextPage', () => {
        const state = reducer(initialState, {
            type: "setNextPage",
            nextPage: 'https://test/'
        });

        expect(state.nextPage).toBe('https://test/');
    })

    it('should render layout provider', () => {
        const { asFragment, getByText } = render(<LayoutProvider><div>TEST_CHILD</div></LayoutProvider>);
        expect(getByText("TEST_CHILD")).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});

