import { Client, envs } from 'stytch';
import { User } from '../db/entities/User';
import { createToken } from './jwt';

const client = new Client({
  env: envs.test,
  project_id: 'project-test-a5af3d9b-a236-4833-ac7c-885f10676eef',
  secret: 'secret-test-WwzCRSjMcv92lngpp8w1ukuwG9186gaqQl0=',
});

export const loginOrCreate = async (phone_number: string) => {
  const {phone_id, user_created, user_id} = await client.otps.sms.loginOrCreate({
    phone_number,
  });

  if (user_created) {
    const u = new User();
    u.stytchId = user_id;
    await u.save();
  }

  return phone_id;
}

export const authenticate = async (method_id: string, code: string) => {
  const {user_id} = await client.otps.authenticate({
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