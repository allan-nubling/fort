import passport from 'passport'

export default class Auth {
    public static user = passport.authenticate('user', { session: false })
}
