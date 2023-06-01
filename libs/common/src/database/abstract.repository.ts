import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export class AbstractRepository<TDocument extends AbstractDocument> {
  protected logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = this.model.create({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument).save();
  }
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        lean: true,
        new: true,
      },
    );
    if (!updatedDocument) {
      this.logger.warn('THIS DOCUMENT WAS NOT Updated', updateQuery);
      throw new NotFoundException();
    }
    return updatedDocument;
  }
  async findAll(): Promise<TDocument[]> {
    const documents = await this.model.find();
    if (!documents) {
      this.logger.warn('COULD NOT LOAD ALL THE DOCUMENTS');
      throw new NotFoundException();
    }
    return documents;
  }
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filterQuery);
    if (!document) {
      this.logger.warn('THIS DOCUMENT WAS NOT DELETED', filterQuery);
      throw new NotFoundException();
    }
    return document;
  }
}
