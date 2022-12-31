import {
  Button,
  HStack,
  Box,
  Heading,
  Spacer,
  Text,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { AuthLayout, FormField } from "components/authentication";
import Layout from "components/layout";
import { Field, Form, Formik } from "formik";
import { regSchema } from "lib/yupSchemas";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";

type FormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  isGestore: boolean;
};

const Register: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  });

  let emailUsedError = null;

  async function handleSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 201) {
        signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      emailUsedError = error.message;
      if (process.env.NODE_ENV === "development")
        console.error("An unexpected error happened occurred:", error);
    }
  }

  const formList = [
    {
      fieldName: "name",
      label: "Nome",
      type: "text",
      placeholder: "John",
    },
    {
      fieldName: "surname",
      label: "Cognome",
      type: "text",
      placeholder: "Doe",
    },
    {
      fieldName: "email",
      label: "Email",
      type: "email",
      placeholder: "yourname@host.tld",
    },
    {
      fieldName: "password",
      label: "Password",
      type: "password",
      placeholder: "Please make me strong",
    },
    {
      fieldName: "passwordConfirm",
      label: "Conferma Password",
      type: "password",
      placeholder: "Confirm strong password",
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
        <Head>
          <title>Register</title>
        </Head>
        <AuthLayout>
          <Formik
            validationSchema={Yup.object().shape({
              name: regSchema.name,
              surname: regSchema.name,
              email: regSchema.email.test(
                "Server",
                () => emailUsedError,
                () => !emailUsedError
              ),
              password: regSchema.password,
              passwordConfirm: Yup.string()
                .required("This field is very important.")
                .oneOf([Yup.ref("password")], "Passwords don't match!"),
            })}
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              passwordConfirm: "",
              isGestore: false,
            }}
            onSubmit={async (values, actions) => {
              await handleSubmit(values);
              await actions.validateForm();
              emailUsedError = null;
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <VStack spacing={4}>
                  <Heading>Registrati</Heading>
                  {formList.map((formItem) => (
                    <FormField key={formItem.fieldName} {...formItem} />
                  ))}
                  <Field as={Checkbox} name="isGestore">
                    Registrati come Gestore
                  </Field>
                  <Spacer my={4} />
                  <Button w="100%" isLoading={props.isSubmitting} type="submit">
                    Registrati
                  </Button>
                  <HStack justify="center">
                    <Text>Hai già un account?</Text>
                    <Button onClick={() => signIn()} variant="link">
                      Login
                    </Button>
                  </HStack>
                </VStack>
              </Form>
            )}
          </Formik>
        </AuthLayout>
      </Layout>
    </Box>
  );
};

export default Register;
