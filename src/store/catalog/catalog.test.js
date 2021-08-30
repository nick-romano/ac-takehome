import { render } from '@testing-library/react';
import { CatalogProvider, initialState } from './context';
import { reducer, shelfIdCounter } from './reducer';

let state;

const getPrevious = () => `shelf-${shelfIdCounter - 1}`

describe('testing catalog store', () => {

    afterEach(() => { state = initialState });

    it('should render with children', () => {
        const { asFragment, getByText } = render(
        <CatalogProvider><div>TESTING!</div></CatalogProvider>
        )

        expect(getByText('TESTING!')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    })

    it('should update state to include a new shelf when create shelf is called', () => {
        
        state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF"
        });

        const previous = `shelf-${shelfIdCounter - 1}`

        expect(state).toEqual(
            expect.objectContaining({
                [previous] : expect.objectContaining({
                    id: previous,
                    name: "TEST_SHELF",
                    records: []
                })
            })
        );
    });

    it('should update state to include delete shelf when delete shelf is called', () => {
        // add shelf;
        state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF"
        });

        // make sure we have shelf-previous;
        expect(state).toEqual(
            expect.objectContaining({
                [getPrevious()]: expect.anything()
            })
        );

        // remove shelf
        state = reducer(state, {
            type: "deleteShelf",
            id: getPrevious()
        });

        // expect to not see previous shelf, because it was deleted
        expect(state).toEqual(
            expect.not.objectContaining({
                [getPrevious()]: expect.anything()
            })
        )
    });

    it('should rename a shelf', () => {
        // create shelf
        state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF1"
        });
        // rename latest shelf
        state = reducer(state, {
            type: "renameShelf",
            id: getPrevious(),
            name: "Cool Shelf"
        });

        expect(state[getPrevious()].name).toBe("Cool Shelf")
    });

    it('should add a record to the shelf', () => {
        // create shelf
        state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF1"
        });

        // create shelf
        state = reducer(state, {
            type: "addRecordToShelf",
            shelfId: getPrevious(),
            recordId: "76035"
        });

        expect(state[getPrevious()].records).toEqual(["76035"]);
    });

    it('should remove a record from the shelf', () => {
        // create shelf
        state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF1"
        });

        // create shelf
        state = reducer(state, {
            type: "addRecordToShelf",
            shelfId: getPrevious(),
            recordId: "76035"
        });

        state = reducer(state, {
            type: "removeRecordFromShelf",
            shelfId: getPrevious(),
            recordId: "76035",
        })

        expect(state[getPrevious()].records).toEqual([]);
    });

    it('should reset the state', () => {
         // create shelf
         state = reducer(state, {
            type: "createShelf",
            name: "TEST_SHELF1"
        });

        // create shelf
        state = reducer(state, {
            type: "addRecordToShelf",
            shelfId: getPrevious(),
            recordId: "76035"
        });

        state = reducer(state,{
            type: "resetState"
        })

        expect(state).toEqual(initialState)
    })

    it('should throw an error with unknown action type', () => {
        expect(() => reducer(initialState, {
            type: "randomType",
            user: "TEST"
        })).toThrow()
    })
});