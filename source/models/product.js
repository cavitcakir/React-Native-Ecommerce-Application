let a = 1;
class Product {
  constructor(
    pId,
    quantity,
    price,
    oldPrice,
    stock,
    imgSrc,
    cost,
    name,
    modelNo,
    description,
    warrantyStatus,
    disturbuterInfo,
    listedDate,
    categoryName,
    avgRating,
    displayOldPrice
  ) {
    this.id = pId;
    this.quantity = quantity;
    this.price = price;
    this.oldPrice = oldPrice;
    this.stock = stock;
    this.imgSrc = imgSrc;
    this.cost = cost;
    this.name = name;
    this.modelNo = modelNo;
    this.description = description;
    this.warrantyStatus = warrantyStatus;
    this.disturbuterInfo = disturbuterInfo;
    this.listedDate = listedDate;
    this.categoryName = categoryName;
    this.avgRating = avgRating;
    this.displayOldPrice = displayOldPrice;
  }
}

export default Product;
