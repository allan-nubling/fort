/* eslint-disable no-use-before-define */
export class GeneralError extends Error {
    status = 'Error'

    constructor(message: string) {
        super()
        this.message = message
    }

    getCode(): number {
        if (this instanceof BadRequest) return 400
        if (this instanceof Unauthorized) return 401
        if (this instanceof NotFound) return 404
        if (this instanceof Unprocessable) return 422
        if (this instanceof AlreadyExists) return 409
        return 500
    }
}

export class BadRequest extends GeneralError {
    status = 'BadRequest'
}
export class Unauthorized extends GeneralError {
    status = 'Unauthorized'
}
export class NotFound extends GeneralError {
    status = 'NotFound'
}
export class Unprocessable extends GeneralError {
    status = 'Unprocessable'
}
export class AlreadyExists extends GeneralError {
    status = 'AlreadyExists'
}
