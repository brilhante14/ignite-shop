import Image from "next/image";
import { styled } from "../styles"
import { HomeContainer, Product } from "../styles/pages/home";

import shirt1 from '../assets/merch/1.png';
import shirt2 from '../assets/merch/2.png';
import shirt3 from '../assets/merch/3.png';

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={480} alt="Product 1" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} width={520} height={480} alt="Product 2" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

