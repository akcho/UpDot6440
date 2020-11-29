import {
    Button,
    Link,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    InputGroup,
    InputRightElement,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
} from "@chakra-ui/core";
import React, { useState } from "react";
import db from "../lib/firebase";

const Register = () => {
    const { isOpen, onOpen,  onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isSaving] = useState(false);
    const [userText, setUserText] = useState("Create account")
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleChange = (event)=>setPassword(event.target.value)

    const handleSubmit = async () => {
        await db.collection("users").add({
            name, 
            password
        });

        onClose();
        setName("");
        setPassword("");
        setUserText("Hi, " + name + ".");
    };


    return (
        <>
        <Link className="register-link" onClick={onOpen} color="orange.400" fontWeight="bold">
            {userText}
        </Link>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Register</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="users-name">
                            <FormLabel size="md">Choose username</FormLabel>
                            <Input
                            type="users-name"
                            placeholder="Enter username"
                            value={name}
                            size="md"
                            onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <br></br>
                        <FormControl id="users-password">
                            <FormLabel>Set password</FormLabel>
                            {/* <Textarea
                            type="password"
                            // placeholder="This is where you write your dot phrase's expanded text."
                            onChange={(e) => setPassword(e.target.value)}
                            /> */}
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={handleChange}
                                />
                                <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <HStack spacing={4}>
                            <Button onClick={onClose}>Close</Button>
                            <Button
                            onClick={handleSubmit}
                            colorScheme="blue"
                            disabled={!name.trim()}
                            isLoading={isSaving}
                            >
                                Submit
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
        </>
    );
};

export default Register;