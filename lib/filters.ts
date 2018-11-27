import { NextFunction, Request, Response } from "express";

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.url.startsWith("/users/signin") && (!req.session.passport || !req.session.passport.user)) {
    return res.status(403).send(
      {
        data: {
          error: "You are not authorised to access this resource.",
        },
        status: "fail",
      },
    );
  }
  next();
};
