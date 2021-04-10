import { getProductsById } from "./handler";
import { Callback, Context } from "aws-lambda";
import * as apiGateway from "@libs/apiGateway";
import * as getMockProducts from "@libs/getMockProducts";


describe('getProductsById', () => {
  const product = {
    "count": 4,
    "description": "Short Product Description1",
    "id": "1",
    "price": 2.4,
    "title": "ProductOne"
  };

  const errorMessage = {message: 'Product not found'};
  const thrownErrorMessage = {message: 'Something wrong'};
  const errorCode = 404;
  const thrownErrorCode = 500;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call formatJSONResponse with a product if the product exists', async () => {
    const formatJSONResponse = jest.spyOn(apiGateway, 'formatJSONResponse');

    jest.spyOn(getMockProducts, 'getMockProducts').mockReturnValue(product);

    await getProductsById({pathParameters: {id: product.id}} as any, {} as Context, {} as Callback);

    expect(formatJSONResponse).toHaveBeenCalledTimes(1);
    expect(formatJSONResponse).toHaveBeenCalledWith(product);
  });

  it('should return error object and status code 404 if a product is not found', async () => {
    const formatJSONResponse = jest.spyOn(apiGateway, 'formatJSONResponse');

    jest.spyOn(getMockProducts, 'getMockProducts').mockReturnValue(undefined);

    await getProductsById({pathParameters: {id: product.id}} as any, {} as Context, {} as Callback);

    expect(formatJSONResponse).toHaveBeenCalledTimes(1);
    expect(formatJSONResponse).toHaveBeenCalledWith(errorMessage, errorCode);
  });

  it('should return error object and status code 500 if server throw error', async () => {
    const formatJSONResponse = jest.spyOn(apiGateway, 'formatJSONResponse');

    await getProductsById({} as any, {} as Context, {} as Callback);

    expect(formatJSONResponse).toHaveBeenCalledTimes(1);
    expect(formatJSONResponse).toHaveBeenCalledWith(thrownErrorMessage, thrownErrorCode);
  });
})
