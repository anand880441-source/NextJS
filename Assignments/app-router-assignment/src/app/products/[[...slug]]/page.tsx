// type ProductPageProps = {
//     params: Promise<{
//         slug: string
//     }>
// }

// const PRODUCTS_DATA = [
//   {
//     "id": 1,
//     "name": "Wireless Mechanical Keyboard",
//     "description": "Compact 75% mechanical keyboard with RGB backlighting and hot-swappable switches.",
//     "price": 89.99,
//     "rating": 4.8
//   },
//   {
//     "id": 2,
//     "name": "Noise Cancelling Headphones",
//     "description": "Over-ear Bluetooth headphones with active noise cancellation and 40-hour battery life.",
//     "price": 149.5,
//     "rating": 4.6
//   },
//   {
//     "id": 3,
//     "name": "Smart Fitness Watch",
//     "description": "Water-resistant smartwatch with heart rate monitoring, GPS, and sleep tracking.",
//     "price": 119.0,
//     "rating": 4.5
//   },
//   {
//     "id": 4,
//     "name": "Portable SSD 1TB",
//     "description": "High-speed USB-C external solid-state drive with up to 1050 MB/s transfer speed.",
//     "price": 99.99,
//     "rating": 4.9
//   },
//   {
//     "id": 5,
//     "name": "Ergonomic Office Chair",
//     "description": "Adjustable mesh office chair with lumbar support and breathable backrest.",
//     "price": 229.99,
//     "rating": 4.7
//   }
// ]

// const ProductPage = async({params} : ProductPageProps) => {
//     const { slug } = await params;
    
//     const product = PRODUCTS_DATA.filter(p=> Number(p.id) === Number(slug))

//     if (!product || product.length === 0) {
//         return <div><h1>Product not found</h1></div>
//     }

//     const {name,description,price,rating} = product[0];
    
//     return(
//         <div>
//           <h1>This is params Product: {slug}</h1>
//           <div>
//             <p>Name: {name}</p>
//             <p>Description: {description}</p>
//             <p>Rating: {rating}</p>
//             <p>Price: {price}</p>
//           </div>
//         </div>
//     )
// }

// export default ProductPage;




import { notFound } from "next/navigation";

type ProductPageProps = { 
  params: Promise<{ slug: string[] }> 
} 

const ProductPage = async ({ params }: ProductPageProps) => { 
  // const { slug } = await params; 
  const paremsValues = await params;
  
  if(!paremsValues?.slug){
    return(
      <div>There is no Parems page</div>
    )
  }
  
  const [category, subCategory, brand, products, productId] = paremsValues.slug; 
  if(paremsValues.slug.length>5) return notFound()
  console.log(paremsValues.slug)

  // console.log(category, subCategory, brand, products, productId); 

  if (category && subCategory && brand && products && productId) {
    return ( 
      <div>This is Products details page: {productId}</div> 
    );
  } 

  if (category && subCategory && brand && products) {
    return ( 
      <div>This is Products details page for: {products}</div> 
    );
  } 

  if (category && subCategory && brand) {
    return ( 
      <div>This is Products details page for: {brand}</div> 
    );
  } 

  if (category && subCategory) {
    return ( 
      <div>This is Products details page: {subCategory}</div> 
    );
  }

  if (category) {
    return ( 
      <div>This is Products details page: {category}</div> 
    );
  } 

  return ( 
    <div> 
      <h1>This is params Product: {paremsValues.slug.join('/')}</h1> 
    </div> 
  ); 
}; 

export default ProductPage;
