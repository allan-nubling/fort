export const nameValidation = (name: string): boolean =>
    !!name.trim() && name.trim().length >= 3

export const emailValidation = (email: string): boolean =>
    !!email.match(/[^@]+@[^@.]+\.[^@]+/g)
