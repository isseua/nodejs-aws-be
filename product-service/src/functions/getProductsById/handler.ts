import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getMockProducts } from "@libs/getMockProducts";
import schema from './schema';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const productId = event.pathParameters.id;
    const product = await getMockProducts(productId);

    if (!product) {
      return formatJSONResponse({message: 'Product not found'}, 404);
    }

    return formatJSONResponse(product);
  } catch (error) {
    console.log('Error: ', error.message);

    return formatJSONResponse({message: 'Something wrong'}, 500);
  }
}

export const main = middyfy(getProductsById);
