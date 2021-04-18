const httpResponse = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_ACCEPTED: 202,
    HTTP_NO_CONTENT: 204,
    HTTP_MULTI_STATUS: 207,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_ACCESS_DENIED: 403,
    HTTP_NOT_FOUND: 404,
    HTTP_NOT_ACCEPTABLE: 406,
    HTTP_UNKNOWN_SERVER_EXCEPTION: 500,
    HTTP_NOT_IMPLEMENTED: 501,
};

const httpMethodType = {
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    GET: 'GET',
};

module.exports = {
    httpMethodType,
    httpResponse
}