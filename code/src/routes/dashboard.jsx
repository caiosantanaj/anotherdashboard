import Dashboard from '../views/Dashboard/Dashboard.jsx';

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "design_app", component: Dashboard },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
