import Layout from "components/layout";

export default function Home() {
  return (
    <Layout>
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <div key={i}>Hello World</div>
        ))}

      {/* <h1>Hello World</h1> */}
    </Layout>
  );
}
