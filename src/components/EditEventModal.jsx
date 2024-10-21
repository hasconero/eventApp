import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "./ui/Button";
import { EditEventForm } from "./EditEventForm";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  categories,
  users,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditEventForm
            event={event}
            categories={categories}
            users={users}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
