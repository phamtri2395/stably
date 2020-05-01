import { createSchema, Type, ExtractDoc } from 'ts-mongoose';

export const TickerSchema = createSchema(
  {
    symbol: Type.string({ required: true }),
    bidPrice: Type.number({ required: true }),
    bidQty: Type.number({ required: true }),
    askPrice: Type.number({ required: true }),
    askQty: Type.number({ required: true }),
  },
  { collection: 'tickers', timestamps: true },
);

export type Ticker = ExtractDoc<typeof TickerSchema>;

export const TickerModel = {
  name: 'Ticker',
  schema: TickerSchema,
};
