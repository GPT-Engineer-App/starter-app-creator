import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### notes

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| created_at | timestamptz | string | true     |
| title      | text        | string | false    |
| content    | text        | string | false    |

*/

// Hooks for notes table

export const useNotes = () => useQuery({
    queryKey: ['notes'],
    queryFn: () => fromSupabase(supabase.from('notes').select('*')),
});

export const useNote = (id) => useQuery({
    queryKey: ['notes', id],
    queryFn: () => fromSupabase(supabase.from('notes').select('*').eq('id', id).single()),
});

export const useAddNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNote) => fromSupabase(supabase.from('notes').insert([newNote])),
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedNote) => fromSupabase(supabase.from('notes').update(updatedNote).eq('id', updatedNote.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('notes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
};