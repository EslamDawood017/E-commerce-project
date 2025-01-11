export class Product {
    id : number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    productImage?: string;
    categoryName?:string;
  
    constructor(
      id :number,
      name: string,
      description: string,
      price: number,
      stockQuantity: number,
      categoryId: number,
      productImage?: string,
      CategoryName?:string
    ) 
    {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.stockQuantity = stockQuantity;
      this.categoryId = categoryId;
      this.productImage = productImage;
      this.categoryName = CategoryName;
    }
  }
  