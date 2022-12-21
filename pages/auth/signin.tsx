import {
  Button,
  Checkbox,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthLayout, FormFields } from "components/authentication";
import Link from "components/chakraNextLink";
import Layout from "components/layout";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "lib/yupSchemas";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";

type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // NOTE: probably there is a better way to do this
  useEffect(() => {
    if (session) router.push("/");
  });

  let errorFromServer = null;

  async function handleSubmit(values: LoginValues) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    errorFromServer = status.error;
    if (!status.error) router.push(status.url);
  }

  const formList = [
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout
        title={<Heading>Log in to your account</Heading>}
        bottom={
          <HStack justify="center">
            <Text>Don&apos;t have an account?</Text>
            <Link href="/auth/signup" variant="link">
              Register
            </Link>
          </HStack>
        }
      >
        <Formik
          validationSchema={Yup.object().shape({
            email: loginSchema.email.test(
              "Server",
              () => errorFromServer,
              () => !errorFromServer
            ),

            password: loginSchema.password.test(
              "Server",
              () => errorFromServer,
              () => !errorFromServer
            ),
          })}
          initialValues={{ email: "", password: "", remember: false }}
          onSubmit={async (values, actions) => {
            await handleSubmit(values);
            await actions.validateForm();
            errorFromServer = null;
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={4}>
                <FormFields list={formList} />
                <HStack alignItems="center" justify="space-between" w="100%">
                  <Field as={Checkbox} name="remember">
                    Remember me?
                  </Field>
                  <Link href="/auth/recover" size="sm" variant="link">
                    Forgot password?
                  </Link>
                </HStack>
                <Spacer my={4} />
                <Button w="100%" isLoading={props.isSubmitting} type="submit">
                  Login
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </Layout>
  );
};

export default Login;
