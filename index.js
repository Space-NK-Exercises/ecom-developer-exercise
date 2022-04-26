const fetchProducts = async () => {
  const dataJSON = await fetch("./data/recommendations.json")
  const data = await dataJSON.json()
  const products = data.productData
  console.log(products)
}



window.addEventListener("load", fetchProducts)
