import Event from "../models/Event";
import Person from "../models/Person";

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

// const events_group1 = [
//     new Event({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 1,
//         name: "Asadon",
//         description:
//             "Et officia nulla ut laborum officia eu mollit qui duis cillum tempor consectetur laboris.",
//         init_date: "2024-12-18T16:54:56+00:00",
//         finish_date: "2024-12-18T16:54:56+00:00",
//     }),
//     new Event({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 2,
//         name: "Bautizon",
//         description:
//             "Sit labore laboris exercitation duis fugiat excepteur fugiat consequat laboris.",
//         init_date: "2025-12-18T16:54:56+00:00",
//         finish_date: "2025-12-18T16:54:56+00:00",
//     }),
// ];

// const events_group2 = [
//     new Event({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 3,
//         name: "Mujeres Fest",
//         description: "Ullamco officia qui nostrud nisi elit.",
//         init_date: "2025-01-18T16:54:56+00:00",
//         finish_date: "2025-12-18T16:54:56+00:00",
//     }),
// ];

// const events_group3 = [
//     new Event({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 4,
//         name: "Jovenes Fest",
//         description: "Anim non eu in anim quis amet est voluptate voluptate.",
//         init_date: "2025-12-18T16:54:56+00:00",
//         finish_date: "2025-12-18T16:54:56+00:00",
//     }),
// ];

// const persons_group1 = [
//     new Person({
//         created_at: "2024-11-27T16:54:56+00:00",
//         updated_at: "2024-11-27T16:54:56+00:00",
//         id: 1,
//         name: "Samuel Agudelo",
//         email: "samdelo1020xpro@gmail.com",
//         phone: "3009019657",
//         address_lan: 100.4,
//         address_lon: 100.4,
//         id_type: "T.I",
//         identity: "1016835219",
//         family: "Agudelo Angulo",
//         marital_status: "single",
//         influencer_id: 0,
//     }),
//     new Person({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 2,
//         name: "Alcira Angulo",
//         email: "alciaz@gmail.com",
//         phone: "3133927135",
//         address_lan: 100.4,
//         address_lon: 100.4,
//         id_type: "C.C",
//         identity: "52095392",
//         family: "Agudelo Angulo",
//         marital_status: "married",
//         influencer_id: 0,
//     }),
// ];

// const persons_group2 = [
//     new Person({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 3,
//         name: "Jimena Agudelo",
//         email: "jimdelo1020@gmail.com",
//         phone: "3008547259",
//         address_lan: 100.4,
//         address_lon: 100.4,
//         id_type: "T.I",
//         identity: "1016835521",
//         family: "Agudelo Angulo",
//         marital_status: "single",
//         influencer_id: 0,
//     }),
// ];

// const persons_group3 = [
//     new Person({
//         created_at: "2024-12-18T16:54:56+00:00",
//         updated_at: "2024-12-18T16:54:56+00:00",
//         id: 2,
//         name: "Alcira Angulo",
//         email: "alciaz@gmail.com",
//         phone: "3133927135",
//         address_lan: 100.4,
//         address_lon: 100.4,
//         id_type: "C.C",
//         identity: "52095392",
//         family: "Agudelo Angulo",
//         marital_status: "married",
//         influencer_id: 0,
//     }),
// ];

// export const groupPages = [
//     {
//         name: "Group 1",
//         path: "group-1",
//         events: events_group1,
//         people: persons_group1,
//     },
//     {
//         name: "Group 2",
//         path: "group-2",
//         events: events_group2,
//         people: persons_group2,
//     },
//     {
//         name: "Group 3",
//         path: "group-3",
//         events: events_group3,
//         people: persons_group3,
//     },
// ];
