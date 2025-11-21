/* eslint-disable */
/**
 * Generated API types for Convex
 */

import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server"

import type * as shows from "../shows"
import type * as playlists from "../playlists"
import type * as hosts from "../hosts"
import type * as creators from "../creators"

export const api: FilterApi<
  ApiFromModules<{
    shows: typeof shows
    playlists: typeof playlists
    hosts: typeof hosts
    creators: typeof creators
  }>,
  FunctionReference<any, "public">
> = {} as any

export const internal: FilterApi<
  ApiFromModules<{
    shows: typeof shows
    playlists: typeof playlists
    hosts: typeof hosts
    creators: typeof creators
  }>,
  FunctionReference<any, "internal">
> = {} as any
