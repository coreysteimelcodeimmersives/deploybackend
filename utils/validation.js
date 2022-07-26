const serverCheckUserIsValid = (reqBody) => {
  if (
    !reqBody.hasOwnProperty("firstName") ||
    !reqBody.firstName === "string" ||
    reqBody.firstName < 1
  ) {
    return false;
  }
  if (
    !reqBody.hasOwnProperty("lastName") ||
    !reqBody.lastName === "string" ||
    reqBody.lastName < 1
  ) {
    return false;
  }
  if (
    !reqBody.hasOwnProperty("email") ||
    !reqBody.email === "string" ||
    reqBody.email < 1
  ) {
    return false;
  }
  return true;
};

module.exports = { serverCheckUserIsValid };
