import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, Product } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css';
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Link from "next/link";
import Head from "next/head";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
}

interface IHomeProps {
  products: IProduct[];
}

export default function Home({ products }: IHomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="Product 1" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>

        ))}
      </HomeContainer>
    </>
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}

