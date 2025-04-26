import { relations } from "drizzle-orm/relations";
import { user, account, session, chats, messages } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	chats_participant1: many(chats, {
		relationName: "chats_participant1_user_id"
	}),
	chats_participant2: many(chats, {
		relationName: "chats_participant2_user_id"
	}),
	messages: many(messages),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const chatsRelations = relations(chats, ({one, many}) => ({
	user_participant1: one(user, {
		fields: [chats.participant1],
		references: [user.id],
		relationName: "chats_participant1_user_id"
	}),
	user_participant2: one(user, {
		fields: [chats.participant2],
		references: [user.id],
		relationName: "chats_participant2_user_id"
	}),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	chat: one(chats, {
		fields: [messages.chatId],
		references: [chats.id]
	}),
	user: one(user, {
		fields: [messages.senderId],
		references: [user.id]
	}),
}));