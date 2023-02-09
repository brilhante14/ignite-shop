import { GetStaticProps } from "next";
import Stripe from "stripe";
import { IProduct } from "..";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface IProductProps {
   product: IProduct;
}

export default function Product({ product }: IProductProps) {
   return (
      <ProductContainer>
         <ImageContainer>
            aaaaaaaaaaaaaaaaa
         </ImageContainer>

         <ProductDetails>
            <h1>Camiseta X</h1>
            <span>R$79,00</span>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, expedita dignissimos recusandae aperiam esse iusto rem autem dolorum facilis quam quibusdam laboriosam odit assumenda qui error ipsum necessitatibus! Culpa, eaque.</p>
            <button>Comprar agora</button>
         </ProductDetails>
      </ProductContainer>
   );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
   const productId = params!.id;

   const product = await stripe.products.retrieve(productId, {
      expand: ['default_price']
   });

   const price = product.default_price as Stripe.Price;

   return {
      props: {
         product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }).format((price.unit_amount || 0) / 100),
            description: product.description,

         }
      },
      revalidate: 60 * 60 * 2
   }
}