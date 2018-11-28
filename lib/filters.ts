import { NextFunction, Response } from "express";
import { IRequest } from "./types";

export const requireLogin = (req: IRequest, res: Response, next: NextFunction) => {
  if (!req.url.startsWith("/users/signin") &&
    (!req.session || !req.session.passport || !req.session.passport.user)
  ) {
    return res.status(403).send(
      {
        data: {
          error: "You are not authorised to access this resource.",
        },
        status: "fail",
      },
    );
  }
  return next();
};
