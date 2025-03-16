import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "@components/pages/Home";
import PortfolioPage from "@components/pages/Portfolio";
import AppLauncherPage from "@components/pages/AppLauncherPage";
import { BooksOverviewPage } from "@components/pages/BooksOverviewPage";
import LearningDashboard from "../LearningDashboard/LearningDashboard";
import Timeline from "../Timeline/Timeline";
import TimelineItem from "../Timeline/TimelineItem";


function AppRouter() {

    const appRoutes = [
        {
            path: "/",
            element: (<HomePage />)
        },
        {
            path: "/portfolio",
            element: (<PortfolioPage />)
        },
        {
            path: "/company",
            element: (<AppLauncherPage />)
        },
        {
            path: "/lessons",
            element: (<LearningDashboard />)
        },
        {
            path: "/timeline",
            element: (<Timeline />)
        },
        {
            path: "/timeline/:id",
            element: (<TimelineItem />)
        },
        {
            path: "/books",
            element: (<BooksOverviewPage />)
        },
    ].map((route) => ({
        id: route.path,
        ...route,
        element: (
            <>
                {route.element}
                {/* Footer */}
                {/* <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body1">
                        Donate to support this project ❤️ <a href="https://www.buymeacoffee.com/michaelwoodward" target="_blank"><img src="https://img.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: "40px" }} /></a> | Open Source <a>Ancient Texts API</a>
                    </Typography>
                </Box> */}
            </>
        )
    }));

    const appRouter = createBrowserRouter(appRoutes);

    return <RouterProvider router={appRouter} />;
};

export default AppRouter;
