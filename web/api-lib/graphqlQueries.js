export const GET_SHOP_DATA = `query {
  shop {
    name
    id
    contactEmail
    email
    description
    checkoutApiSupported
    myshopifyDomain
    productTags(first: 3) {
      edges {
        node
      }
    }
  }
}`;
