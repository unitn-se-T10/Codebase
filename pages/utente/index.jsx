import {
  Button,
  Text,
  Box,
  HStack,
  VStack,
  Spacer,
  Flex,
  Divider,
  Link,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { FormField } from "components/authentication";
import { regSchema } from "lib/yupSchemas";
import Layout from "components/layout";
import { authOptions } from "pages/api/auth/[...nextauth]";

const ModificaText = ({ label, placeholder, href }) => {
  return (
    <VStack alignItems="left" w="full">
      <Text fontSize={15} fontWeight="semibold">
        {label}
      </Text>
      <Flex align="center">
        <Text color="gray">{placeholder}</Text>
        <Spacer />
        <Link href={href}>
          <Button bgColor="#FF3D00">
            <Text color="white" fontSize={15} fontWeight="semibold">
              Modifica
            </Text>
          </Button>
        </Link>
      </Flex>
      <Divider borderColor="gray.400" />
      <Divider borderColor="white" />
    </VStack>
  );
};

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  async function handleSubmit(values) {
    // TODO: implement API call
    //
    // try {
    //   const res = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   });
    //   if (res.status === 200) {
    //     signIn("credentials", {
    //       redirect: false,
    //       email: values.email,
    //       password: values.password,
    //     });
    //   } else {
    //     throw new Error(await res.text());
    //   }
    // } catch (error) {
    //   emailUsedError = error.message;
    //   if (process.env.NODE_ENV === "development")
    //     console.error("An unexpected error happened occurred:", error);
    // }
  }

  const formList = [
    {
      fieldName: "name",
      label: "Nome",
      type: "text",
      placeholder: session.user.name,
    },
    {
      fieldName: "surname",
      label: "Cognome",
      type: "text",
      placeholder: session.user.surname,
    },
  ];

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <VStack alignItems="center" p={10} spacing={10}>
          <Flex direction="column" w="35%" p={10} bgColor="white" rounded={40}>
            <Text align="center" fontSize={30} fontWeight="bold">
              Il mio profilo
            </Text>
            <Formik
              validationSchema={Yup.object().shape({
                name: regSchema.name,
                surname: regSchema.name,
              })}
              initialValues={{
                name: session.user.name,
                surname: session.user.surname,
              }}
              onSubmit={async (values, actions) => {
                await handleSubmit(values);
                await actions.validateForm();
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <VStack spacing={4}>
                    {formList.map((formItem) => (
                      <FormField key={formItem.fieldName} {...formItem} />
                    ))}
                    <ModificaText
                      label="Email"
                      placeholder={session.user.email}
                      href="/utente/modificaemail"
                    />
                    <ModificaText
                      label="Password"
                      placeholder="********"
                      href="/utente/modificapassword"
                    />
                    <Spacer my={4} />
                    <HStack justify="center" spacing={10}>
                      <Link href="/utente">
                        <Button
                          bgColor="#FF3D00"
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Applica modifiche
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button
                          _hover={{ bgColor: "black" }}
                          bgColor="gray.500"
                          onClick={() => router.reload()}
                        >
                          Annulla
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Flex>
        </VStack>
      </Layout>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  session.user.image = null;

  return {
    props: {
      session,
    },
  };
}
