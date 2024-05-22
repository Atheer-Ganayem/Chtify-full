"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Button,
  // Checkbox,
  // Input,
  // Link,
} from "@nextui-org/react";
import {
  Clock,
  //  Lock, Mail
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const UserSettings: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop="blur">
      <ModalContent>
        <div className="p-8 text-xl flex gap-3 items-center">
          Coming soon... <Clock />
        </div>
        {/* {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={<Mail />}
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
              />
              <Input
                endContent={<Lock />}
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )} */}
      </ModalContent>
    </Modal>
  );
};

export default UserSettings;
