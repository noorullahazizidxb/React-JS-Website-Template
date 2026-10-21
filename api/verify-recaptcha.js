// Vercel serverless function: verifies a reCAPTCHA v3 token server-side.
const ALLOWED_HOSTS = ["ourworks.devminds.net", "budget-manager.devminds.net", "localhost"];
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "method not allowed" });
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return res.status(500).json({ success: false, error: "recaptcha not configured" });
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const { token, action } = body;
  if (!token || typeof token !== "string") return res.status(400).json({ success: false, error: "missing token" });

  const params = new URLSearchParams({ secret, response: token });
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (ip) params.set("remoteip", ip);
  try {
    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", body: params });
    const d = await r.json();
    const hostOk = ALLOWED_HOSTS.includes(d.hostname);
    const scoreOk = typeof d.score !== "number" || d.score >= MIN_SCORE; // v2 tokens have no score
    const actionOk = !action || !d.action || d.action === action;
    const ok = d.success === true && hostOk && scoreOk && actionOk;
    return res.status(ok ? 200 : 403).json({ success: ok, score: d.score, action: d.action, errors: d["error-codes"] || [] });
  } catch (e) {
    return res.status(502).json({ success: false, error: "verification failed" });
  }
}
