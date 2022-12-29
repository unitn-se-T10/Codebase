import Layout from "components/layout";
import {
  Box,
  Flex,
  VStack,
  Text,
  Spacer,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { regSchema, loginSchema } from "lib/yupSchemas";
import { FormField } from "components/authentication";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function Home() {
  const router = useRouter();

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
      fieldName: "oldPassword",
      label: "Vecchia Password",
      type: "password",
      placeholder: "Inserisci la tua password attuale",
    },
    {
      fieldName: "newPassword",
      label: "Nuova Password",
      type: "password",
      placeholder: "Inserisci la tua nuova password",
    },
    {
      fieldName: "newPasswordConfirm",
      label: "Conferma Nuova Password",
      type: "password",
      placeholder: "Conferma la tua nuova password",
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
              Cambia Password
            </Text>
            <Spacer />
            <Formik
              validationSchema={Yup.object().shape({
                oldPassword: loginSchema.password,
                newPassword: regSchema.password,
                newPasswordConfirm: Yup.string()
                  .required("This field is very important.")
                  .oneOf([Yup.ref("newPassword")], "Passwords don't match!"),
              })}
              initialValues={{
                oldPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
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

  return {
    props: {
      session,
    },
  };
}
