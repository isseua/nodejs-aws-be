const mock = [
  {
    "count": 4,
    "description": "Short Product Description1",
    "id": "1",
    "price": 2.4,
    "title": "ProductOne"
  },
  {
    "count": 6,
    "description": "Short Product Description2",
    "id": "2",
    "price": 10,
    "title": "ProductTwo"
  },
  {
    "count": 7,
    "description": "Short Product Description3",
    "id": "3",
    "price": 23,
    "title": "ProductThree"
  },
  {
    "count": 12,
    "description": "Short Product Description4",
    "id": "4",
    "price": 15,
    "title": "ProductFour"
  },
  {
    "count": 7,
    "description": "Short Product Description5",
    "id": "5",
    "price": 23,
    "title": "ProductFive"
  },
  {
    "count": 8,
    "description": "Short Product Description6",
    "id": "6",
    "price": 15,
    "title": "ProductSix"
  },
  {
    "count": 2,
    "description": "Short Product Descriptio7",
    "id": "7",
    "price": 23,
    "title": "ProductSeven"
  },
  {
    "count": 3,
    "description": "Short Product Description8",
    "id": "8",
    "price": 15,
    "title": "ProductEight"
  },
];

export const getMockProducts = (productId?: string) => {
  if (productId) {
    return mock.find(({ id }) => id === productId)
  }

  return mock;
}
