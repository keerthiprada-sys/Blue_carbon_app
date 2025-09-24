export function requireAuth(req, res, next) {
  // TODO: add JWT check later
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    // TODO: check real user role from JWT
    if (role === "verifier") {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: Not a verifier" });
    }
  };
}
