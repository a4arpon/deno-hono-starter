import { UsersServices } from "#services/users.services.ts"
import { Context } from "#types/shared.types.ts"
import { safeAsync } from "#utils/async.ts"
import { response } from "#utils/response.ts"
import { Hono } from "hono"
import { authGuard } from "../middlewares/auth.guard.ts"

export class StableRoutes {
  public stableRoutes = new Hono()

  // public stableRoutes = new Hono().use(authGuard) use this block if you want to apply middleware on this whole route path

  constructor() {
    // Base Stable Api Response
    this.stableRoutes.get((c: Context) => response(c, "Stable api channel"))

    // User Api Routes Here
    this.usersRoutes()
  }

  private usersRoutes() {
    const usersServices = new UsersServices()
    // https://localhost:4000/stable/users/*
    this.stableRoutes.basePath("users")
      .get("/", safeAsync(usersServices.users))
      .post("/create-user", authGuard, safeAsync(usersServices.createUser))
    // .patch('/')
    // .put('/')
    // .delete('/')
  }
}
