console.log("HEY");
// const script = document.createElement("script");
// script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
// script.type = "text/javascript";
// script.onreadystatechange = handler;
// script.onload = handler;
// document.getElementsByTagName("head")[0].appendChild(script);
function handler() {
  function myContent(data) {
    const sectionHeader = document.getElementsByClassName("section__header")[0];
    var sectionBox = document.createElement("div");
    sectionBox.className = "content-box";
    var title = document.createElement("span").createTextNode("Water");
    sectionBox.appendChild(title);
    sectionHeader.after(sectionBox);
  }

  const shop = Shopify.shop;
  fetch(
    `http://127.0.0.1:5001/coworkingspaces-48082/us-central1/app/product-data?tagId=${shop}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      myContent(data);
    })
    .catch((error) => console.log(error));
}

// border: 1px solid #d9d9d9;
//     margin-top: 20px;
//     border-radius: 5px;
// padding: 1.1428571429em

// title - h2
