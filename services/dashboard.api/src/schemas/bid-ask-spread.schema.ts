import { createSchema, Type, ExtractDoc } from 'ts-mongoose';

export const BidAskSpreadSchema = createSchema(
  {
    symbol: Type.string({ required: true }),
    bidPrice: Type.number({ required: true }),
    askPrice: Type.number({ required: true }),
    spread: Type.number({ required: true }),
  },
  { collection: 'bid_ask_spreads', timestamps: true },
);

export type BidAskSpread = ExtractDoc<typeof BidAskSpreadSchema>;

export const BidAskSpreadModel = {
  name: 'BidAskSpread',
  schema: BidAskSpreadSchema,
};
