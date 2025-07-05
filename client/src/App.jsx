import NavigationPanel from "./components/navigation_and_filters/NavigationPanel";
import SearchFilters from "./components/navigation_and_filters/SearchFilters";
import AuthPanel from "./components/auth/AuthPanel";

import { useAuthContext } from "./contexts/AuthContext";

import {
    useGlobalPageContext,
    GlobalPageProvider,
} from "./contexts/PageContext";

import useFilteredPages from "./hooks/pages/useFilteredPages";
import { globalPages } from "./types/pages";

const App = () => {
    const { page, pages, setPage } = useGlobalPageContext();
    const { user } = useAuthContext();

    const filteredPages = useFilteredPages(pages, user);

    return (
        <div className="p-4 h-screen relative bg-background dark:bg-background-dark">
            <div
                className="bg-secondary dark:bg-secondary-dark rounded-xl h-full"
                style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
            >
                <div className="gap-1 p-4 flex flex-row h-full">
                    <div className="flex h-full flex-col justify-between flex-none p-2 w-[230px]">
                        <div className="flex flex-col gap-4">
                            <AuthPanel
                                selectedPage={page.path}
                                user={user}
                                onClick={() =>
                                    setPage(
                                        page.path !== "login" ? "login" : "home"
                                    )
                                }
                            />
                            <NavigationPanel
                                pages={filteredPages}
                                selectedPage={page.path}
                                handleChangePage={setPage}
                            />
                        </div>
                        <SearchFilters />
                    </div>
                    {page.component}
                </div>
            </div>
        </div>
    );
};

const AppGlobalPages = () => (
    <GlobalPageProvider
        pages={globalPages}
        initialPage={localStorage.getItem("page") || "home"}
    >
        <App />
    </GlobalPageProvider>
);

export default AppGlobalPages;
