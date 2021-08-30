import { useContext } from 'react';
import { AdminContext } from './context';

export const useAdminContext = () => useContext(AdminContext);
