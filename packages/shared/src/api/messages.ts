import type { AlteragesSupabaseClient } from '../supabase/client';

/**
 * Couche d'abstraction API — messagerie temps réel.
 */

export interface Conversation {
  id: string;
  created_at: string;
  // TODO: participants, dernière lecture, etc.
}

export interface Message {
  id: string;
  conversation_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export async function listConversations(
  _supabase: AlteragesSupabaseClient,
  _userId: string,
): Promise<Conversation[]> {
  throw new Error('Not implemented: listConversations');
}

export async function listMessages(
  _supabase: AlteragesSupabaseClient,
  _conversationId: string,
): Promise<Message[]> {
  throw new Error('Not implemented: listMessages');
}

export async function sendMessage(
  _supabase: AlteragesSupabaseClient,
  _conversationId: string,
  _content: string,
): Promise<Message> {
  throw new Error('Not implemented: sendMessage');
}
