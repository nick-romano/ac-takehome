import { AdminProvider } from "./admin/context";
import { CatalogProvider } from "./catalog/context";
import { LayoutProvider } from "./layout/context";

const RootContextProvider = ({ children }) => (
    <AdminProvider>
        <LayoutProvider>
            <CatalogProvider>
                {children}
            </CatalogProvider>
        </LayoutProvider>
    </AdminProvider>
);

export default RootContextProvider;