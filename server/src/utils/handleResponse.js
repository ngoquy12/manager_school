module.exports.handleResponse = (
  res,
  status,
  userMessage,
  devMessage,
  data
) => {
  const response = { status };

  if (userMessage) {
    response.userMessage = userMessage;
  }

  if (devMessage) {
    response.devMessage = devMessage.message;
  }

  if (data) {
    response.data = data;
  }

  return res.status(status).json(response);
};
