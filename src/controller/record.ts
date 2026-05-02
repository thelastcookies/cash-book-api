import type { Context } from 'koa';
import { recordService } from '../service';

export const save = async (ctx: Context) => {
  const req = ctx.request.body;

  let resBody;
  if ('id' in req) {
    resBody = await recordService.updateRecord(req.id, req);
  } else {
    resBody = await recordService.saveRecord(req);
  }
  ctx.status = 'id' in ctx.request.body ? 200 : 201;
  ctx.body = resBody;
};

export const list = async (ctx: Context) => {
  const { page = '1', pageSize = '10', record, amount } = ctx.query as {
    page?: string;
    pageSize?: string;
    record?: string;
    amount?: string;
  };

  const pageNum = Math.max(1, Number(page));
  const pageSizeNum = Math.max(1, Number(pageSize));
  const skip = (pageNum - 1) * pageSizeNum;

  const where: Record<string, any> = {};
  if (record) where.record = { contains: record };
  if (amount) where.amount = Number(amount);

  const [list, total] = await Promise.all([
    recordService.getRecordList({ skip, take: pageSizeNum, where, orderBy: { createdAt: 'desc' } }),
    recordService.getRecordCount(where),
  ]);

  ctx.body = { list, total, page: pageNum, pageSize: pageSizeNum };
};

export const detail = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    ctx.body = { msg: '无效的 ID 参数' };
    return;
  }

  const result = await recordService.getRecordById(id);
  if (!result) {
    ctx.status = 404;
    ctx.body = { msg: '记录不存在' };
    return;
  }

  ctx.body = result;
};

export const remove = async (ctx: Context) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    ctx.body = { msg: '无效的 ID 参数' };
    return;
  }

  ctx.body = await recordService.deleteRecord(id);
};
