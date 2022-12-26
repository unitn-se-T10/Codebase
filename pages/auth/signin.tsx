import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  PasswordInput,
  AuthLayout,
  FormField,
} from "components/authentication";
import Link from "components/chakraNextLink";
import Layout from "components/layout";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "lib/yupSchemas";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

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

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl: "/" });
  }

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout /* showHeader={false} */>
        <Head>
          <title>Login</title>
        </Head>
        <AuthLayout
          title={<Image alt="logo" width={150} height={150} src="/logo.png" />}
        >
          <Heading mb="4" size="lg">
            Accedi
          </Heading>
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
                  <FormField
                    label="Email"
                    fieldName="email"
                    placeholder="youremail@host.tld"
                  />
                  <PasswordInput
                    showLabel={true}
                    fieldName="password"
                    placeholder="Use your password"
                  />
                  <HStack alignItems="center" justify="space-between" w="100%">
                    <Field as={Checkbox} name="remember">
                      Ricordami
                    </Field>
                    <Link href="/auth/recover" size="sm" variant="link">
                      Password dimenticata?
                    </Link>
                  </HStack>
                  <Spacer my={4} />
                  <Button w="100%" isLoading={props.isSubmitting} type="submit">
                    Accedi
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
          <Spacer my={4} />
          <HStack justify="center">
            <Text>Non hai un account?</Text>
            <Link href="/auth/signup" variant="link">
              Registrati
            </Link>
          </HStack>
          <Flex align="center">
            <Divider borderColor="black" />
            <Text p="2">o</Text>
            <Divider borderColor="black" />
          </Flex>
          <Spacer my={4} />
          <Button
            w="100%"
            color="black"
            leftIcon={<FcGoogle />}
            onClick={handleGoogleLogin}
            variant="outline"
          >
            Accedi con Google
          </Button>
        </AuthLayout>
      </Layout>
    </Box>
  );
};

export default Login;
