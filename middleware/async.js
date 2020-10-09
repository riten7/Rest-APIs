// custom error handling for async express errors, can be useful .. not used for now
export const asyncMiddleware = (handler) => {
  return async (request, response, next) => {
    try {
      await handler(request, response);
    } catch(error) {
      next(error);
    }
  }
}