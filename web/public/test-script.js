console.log("HEY");
const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);
function handler() {
  const body = $("body");
  const shop = Shopify.shop;
  console.log(shop);
}
