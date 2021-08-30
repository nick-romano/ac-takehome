import { useCallback, useState } from 'react';

import { Button, Input } from '@material-ui/core';

export default function Shelves({ records, shelves, dispatch }) {
  const [adding, setAdding] = useState(false);
  const [inputName, setInputName] = useState('');

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      dispatch({ type: 'createShelf', name: inputName });
      setAdding(false);
      setInputName('');
      return false;
    },
    [dispatch, inputName],
  );

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <Input
            inputProps={{
              'data-testid': 'add-shelf',
            }}
            variant="outlined"
            value={inputName}
            onChange={evt => setInputName(evt.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: '1rem' }}
          >
            Submit
          </Button>
        </form>
      ) : (
        <Button variant="contained" onClick={() => setAdding(true)}>
          Add Shelf
        </Button>
      )}
    </>
  );
}
