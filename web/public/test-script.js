console.log("HEY");
// const script = document.createElement("script");
// script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
// script.type = "text/javascript";
// script.onreadystatechange = handler;
// script.onload = handler;
// document.getElementsByTagName("head")[0].appendChild(script);
function handler() {
  function myContent(data) {
    // Creating heading
    const sectionHeader = document.getElementsByClassName("section__header")[0];
    const title = document.createElement("h2");
    title.style.borderTop = "1px solid #e6e6e6";
    title.style.paddingTop = "1em";
    title.style.margin = "1em ";
    const titleText = document.createTextNode("Support other D2C stores");
    titleText.className = "heading-2";
    title.appendChild(titleText);
    sectionHeader.after(title);

    // Creating the image
    var sectionBox = document.createElement("div");
    sectionBox.className = "content-box";
    var imageBox = document.createElement("IMG");
    imageBox.setAttribute("src", `${data.productImage}`);
    imageBox.setAttribute("width", "100%");
    imageBox.setAttribute("height", "300px");
    imageBox.style.objectFit = "cover";
    imageBox.style.borderTopLeftRadius = "4px";
    imageBox.style.borderTopRightRadius = "4px";
    sectionBox.appendChild(imageBox);

    // Creating title and description
    var sectionTextBox = document.createElement("div");
    sectionTextBox.className = "content-box__row";
    var sectionTitle = document.createElement("h2");
    sectionTitle.className = "heading-2";
    var sectionTitleContent = document.createTextNode(`${data.title}`);
    var sectionBody = document.createElement("p");
    var sectionBodyContent = document.createTextNode(`${data.description}`);

    sectionTitle.appendChild(sectionTitleContent);
    sectionBody.appendChild(sectionBodyContent);
    sectionTextBox.appendChild(sectionTitle);
    sectionTextBox.appendChild(sectionBody);
    sectionBox.appendChild(sectionTextBox);

    // Creating a big a tag

    var linkCreate = document.createElement("a");
    linkCreate.title = "my title text";
    linkCreate.href = `http://127.0.0.1:5001/coworkingspaces-48082/us-central1/app/advert-click/?adDisplayId=${data.adDisplayId}&productId=${data.productId}`;
    linkCreate.target = "_blank";
    linkCreate.appendChild(sectionBox);

    title.after(linkCreate);
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
