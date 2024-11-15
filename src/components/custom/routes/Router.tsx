
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from '../../App/App';
import LearningDashboard from "../LearningDashboard/LearningDashboard";


function AppRouter() {

    const appRoutes = [
        {
            path: "/",
            element: (<App />)
        },
        {
            path: "/lessons",
            element: (<LearningDashboard />)
        }
    ].map((route) => ({
        id: route.path,
        ...route,
        element: (
            <>
                {route.element}
            </>
        )
    }));

    const appRouter = createBrowserRouter(appRoutes);

    return <RouterProvider router={appRouter} />;
};

export default AppRouter;
