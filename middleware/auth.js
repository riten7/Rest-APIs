import jwt from 'jsonwebtoken';
import config from 'config';

export const auth = (request, _, next) => {
  const token = request.header('x-auth-token');
  try {
    const decoded = jwt.verify(token, config.get('Course.jwtPrivateKey'));
    request.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}