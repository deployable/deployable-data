
// ### ExtendedError
// Custom errors can extend this
class ExtendedError extends Error {
  constructor(message, options = {}){
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function'){
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
    if (options.simple) this.simple = options.simple
  }

  // Fix Errors `.toJSON` for our errors
  toJSON(){
    let o = {}
    Object.getOwnPropertyNames(this).forEach(key => o[key] = this[key], this)
    return o
  }

}


// ### ValidationError
// Generic validation error to throw
class ValidationError extends ExtendedError {
  
  constructor(message, options = {}){
    super(message, options)
    this.status = options.status || 400
  }

  // Fix Errors `.toJSON` for our errors
  toJSON(){
    let o = super.toJSON()
    if ( process && process.env.NODE_ENV === 'production' )
      delete o.stack
    return o
  }

}

// Map of HTTP status codes to messages
const httpErrorMap = {
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Object not found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too many requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required'
}

// ### HttpError
// Express HTTP errors
class HttpError extends ExtendedError {
  constructor( status, message, options = {} ){
    if ( message === undefined ) {
      message = (httpErrorMap[status]) ? httpErrorMap[status] : 'Error'
    }
    super(message, options)
    //this.message = message
    this.status = status
    if (options.err) this.err = options.err
  }
  static create( code, custom_message, options ){
    if ( !httpErrorMap[code] ) {
      throw new Error('No HTTP error found ' + code)
    }
    return new HttpError(code, custom_message, options)
  }
}


class KeyError extends ExtendedError {
  constructor( message, options = {} ){
    super(message, options)
    if ( options.key ) this.key = options.key
  }
  toString(){
    let str = super.toString()
    if (this.key) str += ` - ${this.key}`
    return str
  }
}


// ### Exports
module.exports = {
  httpErrorMap, HttpError, ExtendedError, ValidationError, KeyError
}
