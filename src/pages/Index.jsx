import { Container, VStack, Heading, Button, SimpleGrid, Box, Text, HStack, IconButton, Input } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNotes, useAddNote, useUpdateNote, useDeleteNote } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: notes, isLoading } = useNotes();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleAddNote = () => {
    addNote.mutate(newNote);
    setNewNote({ title: "", content: "" });
  };

  const handleUpdateNote = (note) => {
    updateNote.mutate(note);
  };

  const handleDeleteNote = (id) => {
    deleteNote.mutate(id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Notes</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} w="full">
          {notes.map((note) => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md">{note.title}</Heading>
              <Text mt={2}>{note.content}</Text>
              <HStack mt={4} spacing={2}>
                <IconButton icon={<FaEdit />} onClick={() => handleUpdateNote(note)} />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteNote(note.id)} />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
        <Box w="full" p={4} borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="md">Add New Note</Heading>
          <VStack spacing={2} mt={2}>
            <Input
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Input
              placeholder="Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
            <Button colorScheme="teal" onClick={handleAddNote}>Add Note</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;