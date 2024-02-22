import { moduleLogger } from '@sliit-foss/module-logger';
import Link from '@/models/link';

const logger = moduleLogger('Link-repository');

export const createLink = async (link) => { 
  try {
    const newLink = await new Link(link).save(); 
    logger.info('Link created:', newLink); 
  } catch (error) {
    logger.error('Error creating link:', error.message); 
    return false;
  }

};

export const getAllLinks = async ({ page = 1, limit = 10 }) => {
  try {
    const skip = (page - 1) * limit;
    const links = await Link.find().skip(skip).limit(limit).lean();
    return links;
  } catch (error) {
    logger.error('Error retrieving all links:', error.message);
    return false;
  }
};

export const getOneLink = async (filters) => { 
  try {
    const link = await Link.findOne(filters).lean(); 
    if (!link) {
      logger.warn('No link found with filters:', filters); 
      return false;
    }
    logger.info('Link retrieved:', link);
    return link;
  } catch (error) {
    logger.error('Error retrieving link:', error.message); 
    return false;
  }
};

export const findOneAndUpdateLink = async (filters, data) => { 
  try {
    const link = await Link.findOneAndUpdate(filters, data , { new: true }); 

    if (!link) {
      logger.warn('No link found with filters:', filters); 
      return false;
    }
    logger.info('Link updated:', link); 
    return link;
  } catch (error) {
    logger.error('Error updating link:', error.message); 
    return false;
  }
};

export const findAndUpdateLinks = async (filters, data) => { 
  try {
    const updatedLinks = await Link.updateMany(filters, data, { new: true }).lean(); 
    logger.info('Links updated:', updatedLinks); 
    return updatedLinks;
  } catch (error) {
    logger.error('Error updating links:', error.message);
    return false;
  }
};

export const removeLinkByID = async (filters) => {
  try {
    const removedLink = await Link.findOneAndRemove(filters); 
    if (!removedLink) {
      logger.warn('No link found with filters:', filters); 
      return false;
    }
    logger.info('Link removed:', removedLink);
    return removedLink;
  } catch (error) {
    logger.error('Error removing link:', error.message);
    return false;
  }
};
