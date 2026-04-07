import rateLimit from "../Config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "anonymous";

    const { success, limit, remaining, reset } =
      await rateLimit.limit(identifier);

    
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); //
  }
};

export default ratelimiter;