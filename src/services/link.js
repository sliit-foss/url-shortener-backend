import createError from 'http-errors';
import { createLink, findOneAndUpdateLink, getAllLinks, getOneLink, removeLinkByID } from '@/repository/link';

export const addNewLink = async (payload) => {
  const existingLink = await getOneLink({ original_link: payload.original_link });
  if (existingLink) throw new createError(422, 'Link already exists');
  const newLink = await createLink({ ...payload });
  return newLink;
};

export const getLinks = async (query) => {
  let { page, limit } = query;
  page = parseInt(page, 10) || 1; 
  limit = parseInt(limit, 10) || 10; 
  try {
    const links = await getAllLinks({ page, limit });
    return links;
  } catch (error) {
    logger.error('Error getting links:', error.message);
    throw error;
  }
};

export const getLinkByID = async (id) => {
  const link = await getOneLink({ generated_link: id });
  if (!link) throw new createError(401, 'Invalid Link ID');
  return link;
};

export const updateLink = async (linkId, payload) => {
  const updatedLink = await findOneAndUpdateLink({ _id: linkId }, { permissions: payload.permissions });
  if (!updatedLink) throw new createError(401, 'Invalid Link ID');
  return updatedLink;
};

export const deleteLink = async (id) => {
    const link = await removeLinkByID({ _id: id });
    if (!link) throw new createError(401, 'Invalid Link ID');
    return link;
};
