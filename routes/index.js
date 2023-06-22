import express from "express";
import authRoute from "./auth";
import pointsRoute from "./points";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: '/points',
    route: pointsRoute
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;