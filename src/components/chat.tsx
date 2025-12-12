"use client";

import { fetchServerSentEvents } from "@tanstack/ai-react";
import { updateThemeDef, globalSearchDef } from "@/tools/definitions";
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
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

// Create dummy client tools just for type inference
const dummyUpdateTheme = updateThemeDef.client(() => {
  return { success: true };
});

const dummyGlobalSearch = globalSearchDef.client(() => {
  return { resultCount: 0 };
});

const dummyTools = clientTools(dummyUpdateTheme, dummyGlobalSearch);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyChatOptions = createChatClientOptions({
  connection: fetchServerSentEvents("/api/chat"),
  tools: dummyTools,
});

// Infer message types for full type safety
type ChatMessages = InferChatMessages<typeof dummyChatOptions>;

// Message Component with full type safety
export function MessageComponent({
  message,
}: {
  message: ChatMessages[number];
}) {
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
            return <MessageResponse key={idx}>{part.content}</MessageResponse>;
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
