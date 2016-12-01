
const {httpErrorMap, HttpError, ExtendedError, ValidationError} = require('./dply-errors')


class MissingError extends ExtendedError {}

class StoreMissingError extends MissingError {}

class EntityMissingError extends MissingError {}

class EntityExistsError extends ExtendedError {}


module.exports = {
  MissingError,
  StoreMissingError,
  EntityMissingError,
  EntityExistsError,
  httpErrorMap,
  HttpError,
  ExtendedError,
  ValidationError
}
