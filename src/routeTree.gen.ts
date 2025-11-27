import { Route as rootRoute } from "./routes/__root"
import { Route as PlaylistsRoute } from "./routes/playlists"
import { Route as HostsRoute } from "./routes/hosts"
import { Route as CreatorsRoute } from "./routes/creators"
import { Route as IndexRoute } from "./routes/index"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexRoute
      parentRoute: typeof rootRoute
    }
    "/playlists": {
      preLoaderRoute: typeof PlaylistsRoute
      parentRoute: typeof rootRoute
    }
    "/hosts": {
      preLoaderRoute: typeof HostsRoute
      parentRoute: typeof rootRoute
    }
    "/creators": {
      preLoaderRoute: typeof CreatorsRoute
      parentRoute: typeof rootRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([IndexRoute, PlaylistsRoute, HostsRoute, CreatorsRoute])
