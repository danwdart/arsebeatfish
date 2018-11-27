export const requireLogin = (req, res, next) => {
    if (!req.url.startsWith("/users/signin") &&
        (!req.session || !req.session.passport || !req.session.passport.user)) {
        return res.status(403).send({
            data: {
                error: "You are not authorised to access this resource.",
            },
            status: "fail",
        });
    }
    return next();
};
