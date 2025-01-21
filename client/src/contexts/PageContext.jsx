/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const createPageContext = () => {
    const PageContext = createContext();

    const PageProvider = ({ children, pages, initialPage = "home" }) => {
        const [page, _setPage] = useState(
            pages.find((p) => p.path === initialPage) || pages[0]
        );
        useEffect(() => {
            if (pages instanceof Array && pages.length !== 0) {
                _setPage(pages.find((p) => p.path === initialPage) || pages[0]);
                return;
            }

            _setPage([])

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pages]);

        const setPage = (newPage = "home") => {
            const targetPage = pages.find((p) => p.path === newPage);
            if (!targetPage) {
                console.error(`Invalid page: ${newPage}`);
                return;
            }
            _setPage(targetPage);
        };

        return (
            <PageContext.Provider value={{ page, setPage, pages }}>
                {children}
            </PageContext.Provider>
        );
    };

    const usePageContext = () => {
        const context = useContext(PageContext);
        if (!context) {
            throw new Error(
                "usePageContext must be used within a PageProvider"
            );
        }
        return context;
    };

    return { PageProvider, usePageContext };
};

// Global pages
export const {
    PageProvider: GlobalPageProvider,
    usePageContext: useGlobalPageContext,
} = createPageContext();

// Group-specific pages
export const {
    PageProvider: GroupPageProvider,
    usePageContext: useGroupPageContext,
} = createPageContext();

export default createPageContext;
