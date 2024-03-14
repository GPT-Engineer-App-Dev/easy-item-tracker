import React, { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, ListIcon, IconButton, useToast, VStack, HStack, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Can't add an empty todo!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>Quick Todo App</Heading>
        <HStack>
          <Input placeholder="Add a new todo" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="teal" aria-label="Add todo" />
        </HStack>
        <Box w="100%">
          {todos.length > 0 ? (
            <List spacing={3}>
              {todos.map((todo, index) => (
                <ListItem key={index} d="flex" justifyContent="space-between" alignItems="center">
                  <Text>{todo}</Text>
                  <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No todos here. Start adding some!</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
