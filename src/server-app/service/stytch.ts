import { Client, envs } from 'stytch';
import { User } from '../db/entities/User';
import { createToken } from './jwt';

const client = () : Client => {
  return new Client({
    env: envs.test,
    project_id: `${process.env.STYTCH_PROJECT_ID}`,
    secret: `${process.env.STYTCH_SECRET}`,
  });
};

export const loginOrCreate = async (phone_number: string) => {
  const {phone_id, user_created, user_id} = await client().otps.sms.loginOrCreate({
    phone_number,
  });

  if (user_created) {
    const u = new User();
    u.stytchId = user_id;
    u.phoneNumber = phone_number;
    await u.save();
  }

  return phone_id;
}

export const authenticate = async (method_id: string, code: string) => {
  const {user_id} = await client().otps.authenticate({
    method_id,
    code,
  });
  
  if (!user_id) {
    return;
  }

  const u = await User.findOneBy({
    stytchId: user_id,
  });

  if (!u) {
    return;
  }

  return createToken(`${u.id}`);
}