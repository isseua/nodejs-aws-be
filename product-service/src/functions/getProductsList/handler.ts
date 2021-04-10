import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getMockProducts } from "@libs/getMockProducts";
import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const products = await getMockProducts();

    return formatJSONResponse(products);
  } catch (error) {
    console.log('Error: ', error.message);

    return formatJSONResponse({message: 'Something wrong'}, 500);
  }
}

export const main = middyfy(getProductsList);
