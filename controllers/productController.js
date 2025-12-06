import Product from "../models/Products";

export async function createProduct(req, res) {
  try {
    const { title, price, image, category, stock } = req.body;




      const product = await Product.create({
        title,
        price,
        image,
        category,
        stock,
        seller: sellerId
      });

      res.status(201).json({
          product: {
            title: product.title,
            price: product.price,
            image: product.image,
            stock: product.stock,
          },
        });


  } catch (err) {

    console.error("http://localhost:5000/api/product/createProduct -> error: ",err);
    res.status(500).json({ message: "server error" });

  }
}
