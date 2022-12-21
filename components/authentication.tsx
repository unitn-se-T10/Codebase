import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

export type FormFieldsElement = {
  name: string;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

export const FormFields: React.FC<{ list: FormFieldsElement[] }> = ({
  list,
}) => {
  return (
    <>
      {list.map(({ name, label, placeholder, type }) => (
        <Field name={name} key={name}>
          {({ field, form }: FieldProps) => (
            <FormControl
              isInvalid={(form.errors[name] && form.touched[name]) as boolean}
            >
              <FormLabel>{label}</FormLabel>
              <Input {...field} placeholder={placeholder} type={type} />
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      ))}
    </>
  );
};

export const AuthLayout: React.FC<{
  children: React.ReactNode;
  title: React.ReactElement;
  bottom?: React.ReactElement;
}> = ({ children, title, bottom }) => {
  return (
    <Container
      maxW="lg"
      px={{ base: "0", sm: "8" }}
      py={{ base: "12", md: "24" }}
    >
      <Stack spacing="8">
        <VStack textAlign="center">{title}</VStack>

        <Box
          px={{ base: "4", sm: "10" }}
          py={{ base: "0", sm: "8" }}
          bg={{ sm: useColorModeValue("blackAlpha.200", "whiteAlpha.200") }}
          borderRadius={{ base: "none", sm: "xl" }}
          shadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        >
          {children}
        </Box>

        <VStack textAlign="center">{bottom}</VStack>
      </Stack>
    </Container>
  );
};
