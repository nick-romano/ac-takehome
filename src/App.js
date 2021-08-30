import RootContextProvider from './store/RootContextProvider';

import MainPage from './MainPage';

export default function App() {

  return (
    <RootContextProvider>
      <MainPage />
    </RootContextProvider>
  );
}
