export default function (error, request, response, next) {
  if (typeof (error) === 'string') {
    return response.status(400).json({ message: error });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ message: `${error.details.map(x => x.message).join(', ')}` });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ message: 'Access Denied. Token is not a valid one!' });
  }

  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return response.status(500).json({ message: error.message });
}