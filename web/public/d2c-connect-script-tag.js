function myContent(data) {
  // Creating heading
  const sectionHeader = document.getElementsByClassName("section__header")[0];
  const title = document.createElement("h2");
  title.style.borderTop = "1px solid #e6e6e6";
  title.style.paddingTop = "1em";
  title.style.margin = "1em 0";
  const titleText = document.createTextNode("Support home-grown businesses");
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
  linkCreate.href = `https://us-central1-coworkingspaces-48082.cloudfunctions.net/app/advert-click/?adDisplayId=${data.adDisplayId}&productId=${data.productId}`;
  linkCreate.target = "_blank";
  linkCreate.appendChild(sectionBox);

  title.after(linkCreate);
}

const shop = Shopify.shop;
fetch(`https://d2c-app.vercel.app/api/callbacks/show-product?tagId=${shop}`)
  .then((res) => res.json())
  .then((data) => {
    myContent(data);
  })
  .catch((error) => console.error(error));
