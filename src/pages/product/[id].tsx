import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

export default function Product() {
   const { query } = useRouter();

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