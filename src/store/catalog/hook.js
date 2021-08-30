import { useContext } from 'react';
import { CatalogContext } from './context';

export const useCatalogContext = () => useContext(CatalogContext);