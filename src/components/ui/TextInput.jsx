import { Input } from "@chakra-ui/react";

export const TextInput = ({ onChange, ...props }) => (
  <Input size="md" variant="filled" onChange={onChange} {...props} />
);
