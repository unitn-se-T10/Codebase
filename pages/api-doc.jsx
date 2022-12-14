import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import Layout from "components/layout";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }) {
  return (
    <Layout>
      <SwaggerUI spec={spec} />;
    </Layout>
  );
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
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
