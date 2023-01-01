import Layout from "components/layout";
import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Spacer,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { FormField } from "components/authentication";
import * as Yup from "yup";
import { loginSchema } from "lib/yupSchemas";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  let emailUsedError = null;
  let errorFromServer = null;

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
      fieldName: "email",
      label: "Nuova Email",
      type: "email",
      placeholder: "Inserisci la tua email",
    },
    {
      fieldName: "emailConfirm",
      label: "Conferma Nuova Email",
      type: "email",
      placeholder: "Conferma la tua email",
    },
    {
      fieldName: "password",
      label: "Password",
      type: "password",
      placeholder: "Inserisci la tua password",
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
        <VStack alignItems="center" p={20} spacing={10}>
          <Flex direction="column" w="35%" p={10} bgColor="white" rounded={40}>
            <Text
              align="center"
              p={2}
              color="black"
              fontSize={40}
              fontWeight="bold"
            >
              Modifica Email
            </Text>
            <Spacer />
            <Formik
              validationSchema={Yup.object().shape({
                email: loginSchema.email.test(
                  "Server",
                  () => emailUsedError,
                  () => !emailUsedError
                ),
                emailConfirm: Yup.string()
                  .required("This field is very important.")
                  .oneOf([Yup.ref("email")], "Emails don't match!"),

                password: loginSchema.password.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),
              })}
              initialValues={{ email: "", emailConfirm: "", password: "" }}
              onSubmit={async (values, actions) => {
                await handleSubmit(values);
                await actions.validateForm();
                emailUsedError = null;
                errorFromServer = null;
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <VStack spacing={4}>
                    <VStack alignItems="left" w="full" spacing={-1}>
                      <Text>Attuale indirizzo email</Text>
                      <Input
                        isReadOnly
                        type="email"
                        value={session.user.email}
                      />
                    </VStack>
                    {formList.map((formItem) => (
                      <FormField key={formItem.fieldName} {...formItem} />
                    ))}
                    <Spacer my={4} />
                    <HStack justify="center" spacing={10}>
                      <Button
                        bgColor="#FF3D00"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Applica modifiche
                      </Button>
                      <Button
                        _hover={{ bgColor: "black" }}
                        bgColor="gray.500"
                        onClick={() => router.push("/utente")}
                      >
                        Annulla
                      </Button>
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
