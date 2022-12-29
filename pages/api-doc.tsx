import { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "components/layout";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
}>(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <SwaggerUI spec={spec} />;
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hungry Everywhere API Documentation",
        version: "1.0",
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
