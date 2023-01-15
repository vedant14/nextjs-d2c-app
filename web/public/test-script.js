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

  fetch(
    `http://127.0.0.1:5001/coworkingspaces-48082/us-central1/app/product-data?tagId=${shop}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
