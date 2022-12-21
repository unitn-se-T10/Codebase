import { IconButton, Textarea, TextareaProps, chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import { forwardRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";
import type { IconType } from "react-icons";

export const ChakraNextImage = chakra(NextImage, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
    ].includes(prop),
});

/**
 * @see https://github.com/chakra-ui/chakra-ui/issues/670#issuecomment-969444392
 */
export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps & TextareaAutosizeProps
>((props, ref) => {
  return (
    <Textarea
      ref={ref}
      as={ResizeTextarea}
      overflow="hidden"
      w="100%"
      minH="unset"
      resize="none"
      minRows={1}
      {...props}
    />
  );
});
AutoResizeTextarea.displayName = "AutoResizeTextarea";

export type SocialLinkProps = {
  social: string;
  href: string;
};
export const SocialLink: React.FC<SocialLinkProps> = ({ social, href }) => {
  type Socials = {
    [key: string]: React.ReactElement<IconType>;
  };

  const socials: Socials = {
    instagram: <FaInstagram />,
    twitter: <FaTwitter />,
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
  };

  return (
    <IconButton
      as="a"
      fontSize="1.25rem"
      aria-label={social}
      href={href}
      icon={socials[social]}
      isRound
      rel="noopener noreferrer"
      target="_blank"
    />
  );
};
