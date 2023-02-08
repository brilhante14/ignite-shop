import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, Product } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css';
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

interface IHomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: IHomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt="Product 1" />

          <footer>
            <strong>{product.name}</strong>
            <span>R$ {product.price}</span>
          </footer>
        </Product>

      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount || 0) / 100,

    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}

