import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { create, getAll, getById, update, remove } from '@/controllers/link';

const links = express.Router();

links.get('/:id',  tracedAsyncHandler(getById));
// links.post('/',  tracedAsyncHandler(create));
// links.get('/',tracedAsyncHandler(getAll));
// links.put('/:id',  tracedAsyncHandler(update));
// links.delete('/:id', tracedAsyncHandler(remove));

export default links;