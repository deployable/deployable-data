
const {httpErrorMap, HttpError, ExtendedError, ValidationError} = require('./dply-errors')



class StoreError extends ExtendedError {
  constructor( message, options = {} ){
    super(message, options)
    this.store = options.store
  }
  toString(){
    let str = super.toString()
    if (this.store) str += ` - store:${this.store}`
  }
}

class StoreMissingError extends StoreError {}

class EntityError extends StoreError {
  constructor( message, options = {} ){
    super(message, options)
    this.entity = options.entity
  }
  toString(){
    let str = super.toString()
    if (this.entity) str += ` - entity:${this.entity}`
  }
}

class EntityMissingError extends EntityError {}

class EntityExistsError extends EntityError {}



module.exports = {
  //MissingError,
  StoreMissingError,
  StoreError,
  EntityMissingError,
  EntityExistsError,
  EntityError,
  httpErrorMap,
  HttpError,
  ExtendedError,
  ValidationError
}
