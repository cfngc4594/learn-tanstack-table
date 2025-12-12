"use client";

import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { updateThemeDef } from "@/tools/definitions";
import { useTheme } from "next-themes";
import {
  clientTools,
  createChatClientOptions,
  type InferChatMessages,
} from "@tanstack/ai-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";

// Create a dummy client tool just for type inference
const dummyUpdateTheme = updateThemeDef.client(() => {
  return { success: true };
});

const dummyTools = clientTools(dummyUpdateTheme);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyChatOptions = createChatClientOptions({
  connection: fetchServerSentEvents("/api/chat"),
  tools: dummyTools,
});

// Infer message types for full type safety
type ChatMessages = InferChatMessages<typeof dummyChatOptions>;

export function Chat() {
  const { setTheme } = useTheme();

  // Create client implementations with actual theme setter
  const updateThemeClient = updateThemeDef.client((input) => {
    setTheme(input.theme);
    return { success: true };
  });

  // Create typed tools array
  const clientToolsArray = clientTools(updateThemeClient);

  const chatClientOptions = createChatClientOptions({
    connection: fetchServerSentEvents("/api/chat"),
    tools: clientToolsArray,
  });

  const { messages, sendMessage, isLoading } = useChat(chatClientOptions);

  const handleSubmit = ({ text }: PromptInputMessage) => {
    if (text.trim() && !isLoading) {
      sendMessage(text);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Messages */}
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Send a message to get started"
            />
          ) : (
            messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input */}
      <div className="p-4 border-t">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type a message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <div />
            <PromptInputSubmit status={isLoading ? "submitted" : undefined} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

// Message Component with full type safety
function MessageComponent({ message }: { message: ChatMessages[number] }) {
  const hasToolCalls = message.parts.some((part) => part.type === "tool-call");

  return (
    <Message from={message.role}>
      {hasToolCalls && (
        <Badge variant="secondary" className="text-xs w-fit mb-2">
          Tool Calls
        </Badge>
      )}

      <MessageContent>
        {message.parts.map((part, idx) => {
          // Thinking block
          if (part.type === "thinking") {
            return (
              <Card key={idx} className="bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span>💭</span>
                    <span>Thinking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground italic">
                  {part.content}
                </CardContent>
              </Card>
            );
          }

          // Text content
          if (part.type === "text") {
            return (
              <MessageResponse key={idx}>
                {part.content}
              </MessageResponse>
            );
          }

          // Tool call display
          if (part.type === "tool-call") {
            return (
              <Card key={idx} className="border-primary/20">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`tool-${idx}`} className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🛠️</span>
                          <span className="font-mono text-sm font-semibold">
                            {part.name}
                          </span>
                        </div>
                        {part.output !== undefined && (
                          <Badge variant="default" className="ml-auto mr-2">
                            ✓ Executed
                          </Badge>
                        )}
                        {part.output === undefined && (
                          <Badge variant="outline" className="ml-auto mr-2">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3">
                        {/* Tool Input */}
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                            Input
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <pre className="text-xs overflow-x-auto">
                              {JSON.stringify(part.input, null, 2)}
                            </pre>
                          </div>
                        </div>

                        {/* Tool Output */}
                        {part.output !== undefined && (
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                              Output
                            </div>
                            <div className="bg-primary/5 rounded-md p-3 border border-primary/20">
                              <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(part.output, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Tool Call ID */}
                        <div className="text-xs text-muted-foreground">
                          ID:{" "}
                          <code className="bg-muted px-1 py-0.5 rounded">
                            {part.id}
                          </code>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            );
          }

          return null;
        })}
      </MessageContent>
    </Message>
  );
}
