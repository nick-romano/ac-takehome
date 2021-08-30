import { List, Grid, Paper } from '@material-ui/core';

import Record from './Record';

export default function RecordsContainer({ handleScroll, records, shelves, dispatch }) {
  return (
    <>
      <h2>Records</h2>
      <List
        style={{
          backgroundColor: '#f5f5f5',
          height: 'calc(100vh - 12rem)',
          overflow: 'scroll',
        }}
        component={Paper}
        elevation={0}
        onScroll={handleScroll}
      >
        <Grid container>
        {records.map(record => (
          <Grid item xs={6} sm={6} md={4} key={record.id}>
            <Record
              record={record}
              shelves={shelves}
              dispatch={dispatch}
            />
          </Grid>
        ))}
        </Grid>
      </List>
    </>
  );
}
