import {
  Button,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthLayout, FormField } from "components/authentication";
import Layout from "components/layout";
import { Form, Formik } from "formik";
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
      if (res.status === 200) {
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
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "John",
    },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      placeholder: "Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "yourname@host.tld",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Please make me strong",
    },
    {
      name: "passwordConfirm",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm strong password",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <AuthLayout
        title={<Heading>Register</Heading>}
        bottom={
          <HStack justify="center">
            <Text>Already have an account?</Text>
            <Button onClick={() => signIn()} variant="link">
              Login
            </Button>
          </HStack>
        }
      >
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
                {formList.map((formItem) => (
                  <FormField
                    key={formItem.name}
                    fieldName={formItem.name}
                    label={formItem.label}
                    type={formItem.type}
                    placeholder={formItem.placeholder}
                  />
                ))}
                <Spacer my={4} />
                <Button w="100%" isLoading={props.isSubmitting} type="submit">
                  Register
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </Layout>
  );
};

export default Register;
