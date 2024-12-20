const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Adjust the path as necessary

passport.use(new GoogleStrategy({
  clientID: '734336345997-sd25pbd404dppv8uafvfkhqc18b12ala.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:4000/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
  
});

module.exports = passport;