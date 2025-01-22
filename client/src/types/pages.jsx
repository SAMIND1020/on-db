import PeoplePage from "../views/pages/PeoplePage";
import GroupsPage from "../views/pages/GroupsPage";
import EventsPage from "../views/pages/EventsPage";
import HomePage from "../views/pages/HomePage";
import SettingsPage from "../views/pages/SettingsPage";
import LoginModal from "../views/modals/LoginModal";

export const globalPages = Object.freeze([
    { name: "Home", path: "home", icon: "home", component: <HomePage /> },
    {
        name: "People",
        path: "people",
        icon: "group",
        component: <PeoplePage />,
    },
    {
        name: "Events",
        path: "events",
        icon: "event",
        component: <EventsPage />,
    },
    {
        name: "Groups",
        path: "groups",
        icon: "groups",
        component: <GroupsPage />,
    },
    {
        name: "Settings",
        path: "settings",
        icon: "settings",
        component: <SettingsPage />,
    },
    {
        name: "Login",
        path: "login",
        icon: "login",
        component: <LoginModal />,
    },
]);