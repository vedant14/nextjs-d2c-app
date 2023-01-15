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

export const GET_APP_DATA = `query{
  app  {
      isPostPurchaseAppInUse
  }
}`;

export const ALL_SCRIPTS = `query{scriptTags(first: 3){
  nodes{
    id
  }
}}`;

export const GET_SCRIPT_TAG = `query{
  scriptTag(id: "gid://shopify/ScriptTag/41734045718"){
    id
    src
    displayScope
  }
}`;
