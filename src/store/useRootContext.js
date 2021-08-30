import { useAdminContext } from './admin/hook';
import { useCatalogContext } from './catalog/hook';
import { useLayoutContext } from './layout/hook';

const useRootContext = () => ({
    adminContext: useAdminContext(),
    layoutContext: useLayoutContext(),
    catalogContext: useCatalogContext()
})

export default useRootContext;
