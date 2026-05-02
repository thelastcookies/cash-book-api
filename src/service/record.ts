import prisma from '../prisma.ts';
import type { BaseRecordCreateInput, BaseRecordUpdateInput } from '../generated/prisma/models/BaseRecord.ts';

export const getRecordById = (id: number) => {
  return prisma.baseRecord.findUnique({ where: { id } });
};

export const getRecordList = (params: {
  skip?: number;
  take?: number;
  where?: Record<string, any>;
  orderBy?: Record<string, string> | Record<string, string>[];
}) => {
  return prisma.baseRecord.findMany({
    skip: params.skip,
    take: params.take,
    where: params.where,
    orderBy: params.orderBy,
  });
};

export const getRecordCount = (where?: Record<string, any>) => {
  return prisma.baseRecord.count({ where });
};

export const saveRecord = (data: BaseRecordCreateInput) => {
  return prisma.baseRecord.create({ data });
};

export const updateRecord = (id: number, data: BaseRecordUpdateInput) => {
  return prisma.baseRecord.update({ where: { id }, data });
};

export const deleteRecord = (id: number) => {
  return prisma.baseRecord.delete({ where: { id } });
};
