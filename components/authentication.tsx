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
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type FormFieldProps = {
  fieldName: string;
  label?: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

export const FormField: React.FC<FormFieldProps> = ({
  fieldName,
  label,
  placeholder,
  type,
}) => {
  return (
    <Field name={fieldName}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={
            (form.errors[fieldName] && form.touched[fieldName]) as boolean
          }
        >
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Input {...field} placeholder={placeholder} type={type ?? "text"} />
          <FormErrorMessage>
            {form.errors[fieldName] as string}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export const PasswordInput: React.FC<{
  showLabel?: boolean;
  placeholder: string;
  fieldName: string;
}> = ({ showLabel, placeholder, fieldName }) => {
  const [show, setShow] = useState(false);

  return (
    <Field name={fieldName}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={
            (form.errors[fieldName] && form.touched[fieldName]) as boolean
          }
        >
          {showLabel ? <FormLabel>Password</FormLabel> : null}
          <InputGroup>
            <Input
              {...field}
              placeholder={placeholder}
              type={show ? "text" : "password"}
            />
            <InputRightElement>
              <IconButton
                color="orange.300"
                aria-label="Toggle password visibility"
                bgColor="transparent"
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => setShow(!show)}
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {form.errors[fieldName] as string}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
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
          bg={{ sm: useColorModeValue("gray.200", "gray.600") }}
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
