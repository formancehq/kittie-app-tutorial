const _stripe = require('stripe');

export const stripe = () => {
  return _stripe(process.env['STRIPE_SECRET_KEY']);
}