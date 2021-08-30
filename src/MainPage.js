import { useCallback, useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';

import RecordsContainer from './components/RecordsContainer';

import SideMenu from './components/SideMenu';

import Shelf from './components/Shelf';

import AppBarBanner from './components/AppBarBanner';

import AddShelfModal from './components/AddShelfModal';

import ChangeUserModal from './components/ChangeUserModal';

import useRootContext from './store/useRootContext';

export default function MainPage() {
  const [records, setRecords] = useState([]);
  const { catalogContext, layoutContext, adminContext } = useRootContext();
  const { shelves, dispatch } = catalogContext;
  const{ dispatch: layoutDispatch, perPage } = layoutContext;
  const { user } = adminContext;

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        dispatch({
          type: 'reorderInShelf',
          shelfId: source.droppableId,
          oldIndex: source.index,
          newIndex: destination.index,
        });
      } else {
        dispatch({
          type: 'moveBetweenShelves',
          oldShelf: source.droppableId,
          newShelf: destination.droppableId,
          oldIndex: source.index,
          newIndex: destination.index,
        });
      }
    },
    [dispatch],
  );

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      layoutContext.nextPage && fetchData(layoutContext.nextPage);
    }
  }
  

  // empty records when user changes
  useEffect(() => {
    setRecords([]);
  }, [user])

  const fetchData = useCallback((url) => {
    fetch(
      url
    )
      .then(resp => resp.json())
      .then(json => {
        setRecords(oldRecords => {
          return [...oldRecords, ...json.releases.map(release => {
            const { id, basic_information: info } = release;
            return {
              id: `${id}`,
              title: info.title,
              formats: info.formats.map(format => format.name),
              label: info.labels?.[0]?.name ?? '',
              artists: info.artists.map(artist => artist.name),
              date: info.year,
            };
          })
          ]
        });
        layoutDispatch({
          type: "setNextPage",
          nextPage: json.pagination.urls.next
        })
      });
  }, [layoutDispatch]);

  // initial fetch; ignoring dependencies bc only want it to run on mount
  useEffect(() => {
    fetchData(`https://api.discogs.com/users/${user}/collection/folders/0/releases?page=1&per_page=${perPage}`);
  }, [fetchData, user, perPage]);



  return (
    <>
      <AppBarBanner title="Record Shelves App" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ textAlign: 'left' }}>
            <SideMenu />
          </Grid>
          <Grid item xs={9}>
            {
              !layoutContext.sideMenuSelection ?
                <RecordsContainer
                  records={records}
                  shelves={shelves}
                  dispatch={dispatch}
                  handleScroll={handleScroll}
                />
                :
                <DragDropContext onDragEnd={onDragEnd}>
                  {Object.values(shelves).map(shelf => (
                    <Shelf
                      key={shelf.id}
                      records={records}
                      shelf={shelf}
                      dispatch={dispatch}
                    />
                  ))}
                </DragDropContext>
            }
          </Grid>
        </Grid>
      </Container>
      <AddShelfModal records={records} />
      <ChangeUserModal />
    </>
  );
}
