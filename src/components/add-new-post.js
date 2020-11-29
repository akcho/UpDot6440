import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea, 
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
} from "@chakra-ui/core";
import React, { useState } from "react";
import db from "../lib/firebase";

const AddNewPost = () => {
    const { isOpen, onOpen,  onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [phrase, setPhrase] = useState("");
    const [isSaving] = useState(false);

    const handleSubmit = async () => {
        const date = new Date();

        await db.collection("descriptions").add({
            title, 
            phrase,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
        });

        onClose();
        setTitle("");
        setPhrase("");
    };

    return (
        <>
        <Button onClick={onOpen} colorScheme="blue">
            Add new phrase
        </Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Add new phrase</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="post-phrase">
                            <FormLabel>Title</FormLabel>
                            <Input
                            type="post-phrase"
                            placeholder=".EXAMPLE"
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            />
                        </FormControl>
                        <br></br>
                        <FormControl id="post-title">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                            type="post-title"
                            placeholder="This is where you write your dot phrase's expanded text."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <HStack spacing={4}>
                            <Button onClick={onClose}>Close</Button>
                            <Button
                            onClick={handleSubmit}
                            colorScheme="blue"
                            disabled={!title.trim()}
                            isLoading={isSaving}
                            >
                                Save
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
        </>
    );
};

export default AddNewPost;