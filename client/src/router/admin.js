import Login from "../components/admin/Login";
import AuthTest from "../components/_to_delete_AUTH_GUARD_TEST";
import AddOffer from "../components/admin/addOffer/AddOffer_MAIN";
import AddEvent from "../components/admin/addEvent/AddEvent_MAIN";
import { deepUserAuthorization, unauthorized } from "./_guards";
//
export default [
    {
        path: "/admin/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Logowanie"
        },
        beforeEnter: unauthorized
    },
    {
        path: "/admin/auth_test",
        name: "AuthTest",
        component: AuthTest,
        meta: {
            title: "AuthTest"
        },
        beforeEnter: deepUserAuthorization
    },
    {
        path: "/admin/dodaj-oferte",
        name: "AddOffer",
        component: AddOffer,
        meta: {
            title: "Dodaj oferte"
        },
        beforeEnter: deepUserAuthorization
    },
    {
        path: "/admin/dodaj-aktualnosc",
        name: "AddEvent",
        component: AddEvent,
        meta: {
            title: "Dodaj aktualność"
        },
        beforeEnter: deepUserAuthorization
    }
];
