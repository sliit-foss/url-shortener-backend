import { asyncHandler } from '@sliit-foss/functions';
import { default as createError } from 'http-errors';
import { decodeJwtToken } from '@/utils';

//TODO: need auth
export const protect = asyncHandler(async (req) => {
  const token = req.headers.authorization
    ? req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]?.replace('null', '')?.replace('undefined', '')
      : null
    : null;
  if (!token) throw new createError(401, 'Unauthorized');
  const decodedUser = decodeJwtToken(token).data;
  const user = decodedUser ? await getOneUser({ _id: decodedUser._id.toString() }, false) : null;
  if (!user) throw new createError(401, 'Unauthorized');
  if (!user.is_active)
    throw new createError(401, 'Your account has been deactivated. Please contact an admin to resolve it');
  req.user_token = token;
  req.user = user;
});
