const handleError = (err, req, res, next) => {
  console.error(err.stack);

  return res
    .status(err.status || 500)
    .json({ error: true, message: err.message || "Internal Server Error" });
};
export default handleError;
