import { getProductsList } from "./handler";
import { Callback, Context } from "aws-lambda";
import * as apiGateway from "@libs/apiGateway";
import * as getMockProducts from "@libs/getMockProducts";


describe('getProductsById', () => {
  const products = [{
    "count": 4,
    "description": "Short Product Description1",
    "id": "1",
    "price": 2.4,
    "title": "ProductOne"
  }];

  const thrownErrorMessage = {message: 'Something wrong'};
  const thrownErrorCode = 500;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call formatJSONResponse with a product if the product exists', async () => {
    const formatJSONResponse = jest.spyOn(apiGateway, 'formatJSONResponse');

    jest.spyOn(getMockProducts, 'getMockProducts').mockReturnValue(products);

    await getProductsList({} as any, {} as Context, {} as Callback);

    expect(formatJSONResponse).toHaveBeenCalledTimes(1);
    expect(formatJSONResponse).toHaveBeenCalledWith(products);
  });

  it('should return error object and status code 500 if server throw error', async () => {
    const formatJSONResponse = jest.spyOn(apiGateway, 'formatJSONResponse');

    jest.spyOn(getMockProducts, 'getMockProducts')
      .mockImplementationOnce((): any => Promise.resolve().then(() => { throw new Error('') }));
    await getProductsList({} as any, {} as Context, {} as Callback);

    expect(formatJSONResponse).toHaveBeenCalledTimes(1);
    expect(formatJSONResponse).toHaveBeenCalledWith(thrownErrorMessage, thrownErrorCode);
  });
})
