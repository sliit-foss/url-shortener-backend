import { addNewLink, getLinkByID, getLinks, updateLink, deleteLink } from '@/services/link';
import { makeResponse } from '@/utils/response';

export const create = async (req, res) => {
  const link = await addNewLink(req.body);
  return makeResponse({ res, data: link, message: 'Link added successfully' });
};

export const getAll = async (req, res) => {
  const links = await getLinks(req.query);
  return makeResponse({ res, data: links, message: 'Links retrieved successfully' });
};

export const getById = async (req, res) => {
  const link = await getLinkByID(req.params.id);
  res.redirect(link.original_link);
};

export const update = async (req, res) => {
  const link = await updateLink(req.params.id, req.body);
  return makeResponse({ res, data: link, message: 'Link updated successfully' });
};

export const remove = async (req, res) => {
    const items = await deleteLink(req.params.id);
    return makeResponse({ res, data: items, message: 'Link removed successfully' });
};
