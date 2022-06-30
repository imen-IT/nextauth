import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";
import products from "@data/products";
import styles from "@styles/Page.module.scss";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { useSession, signIn, signOut } from "next-auth/react";

function AuthLinks() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log("session", session);

  if (loading) return null;
  return (
    <>
      {session ? (
        <p>
          <span>Signed in as {session?.user?.email}</span>
          <button onClick={signOut}>Sign out</button>
        </p>
      ) : (
        <>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
    </>
  );
}

export default function IndexPage() {
  return <AuthLinks />;
}

/*export default function Home({ home, products }) {
  console.log("products", products);

  const { heroTitle, heroText, heroLink, heroBackground } = home;
  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img
                className={styles.heroImage}
                src={heroBackground.url}
                width={heroBackground.width}
                height={heroBackground.height}
                alt=""
              />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.slice(0, 4).map((product) => {
            return (
              <li key={product.id}>
                <Link href="#">
                  <a>
                    <div className={styles.productImage}>
                      <img
                        width={product.image.width}
                        height={product.image.height}
                        src={product.image.url}
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                  </a>
                </Link>
                <p>
                  <Button>Add to Cart</Button>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri:
      "https://api-us-east-1.graphcms.com/v2/cl4o3gra10bbs01xr46y1b6i6/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query Test {
        nextProject(where: { slug: "home" }) {
          id
          name
          heroTitle
          heroText
          heroLink
          heroBackground {
            width
            url
            height
          }
        }
        products(first: 4) {
          name
          price
          slug
          image {
            height
            url
            width
          }
        }
      }
    `,
  });
  const home = data.data.nextProject;
  const products = data.data.products;
  return {
    props: { home, products },
  };
}*/
