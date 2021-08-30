import { render } from '@testing-library/react';
import { reducer } from './reducer';
import { AdminProvider, initialState } from './context';

describe('testing admin store / context for dispatch actions', () => {
    it('should update the state variable "user"', () => {
        const state = reducer(initialState, {
            type: "setUser",
            user: "TEST"
        });
        expect(state.user).toBe("TEST");
    });

    it('should throw an error with unknown action type', () => {
        expect(() => reducer(initialState, {
            type: "randomType",
            user: "TEST"
        })).toThrow()
    })

    it('should render AdminContext without error and with children', () => {
        const { asFragment, getByText } = render(<AdminProvider><div>TEST_CHILD</div></AdminProvider>);
        expect(getByText("TEST_CHILD")).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});
