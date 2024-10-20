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
import { AddEventForm } from "./AddEventForm";
import { Button } from "./ui/Button";

export const AddEventModal = ({ isOpen, onClose, onSubmit, categories }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Pass categories to AddEventForm */}
          <AddEventForm
            onSubmit={onSubmit}
            onClose={onClose}
            categories={categories}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
