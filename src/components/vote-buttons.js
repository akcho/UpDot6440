// src/components/vote-buttons.js

import { IconButton, Text, VStack } from "@chakra-ui/core";
import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ post }) => {
  const handleClick = async (type) => {
    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      upVotesCount = upVotesCount - 1;
    }

    await db.collection("descriptions").doc(post.id).set({
      title: post.title,
      phrase: post.phrase,
      upVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });
  };

  return (
    <>
      <VStack>
        <IconButton
          size="sm"
          colorScheme="blue"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
        />
        <Text bg="gray.100" rounded="md" w="100%" textAlign = "center" p={1}>
          {post.upVotesCount}
        </Text>
        <IconButton
          size="sm"
          colorScheme="orange"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
        />
      </VStack>
    </>
  );
};

export default VoteButtons;