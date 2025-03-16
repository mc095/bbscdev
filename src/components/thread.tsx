"use client";

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/markdown-text";
import { TooltipIconButton } from "@/components/tooltip-icon-button";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="chatbot-scope bg-[var(--background)] box-border flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-6 py-8">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute -top-8 rounded-full disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col px-4">
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <p className="mt-4 font-medium text-[var(--foreground)]">
            How can we help you today?
          </p>
        </div>
        <ThreadWelcomeSuggestions />
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className="mt-3 flex w-full items-stretch justify-center gap-4 px-4">
      <ThreadPrimitive.Suggestion
        className="hover:bg-[var(--muted)]/20 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in"
        prompt="What is BBSC X SVEC?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold text-[var(--foreground)]">
          What is BBSC X SVEC?
        </span>
      </ThreadPrimitive.Suggestion>
      <ThreadPrimitive.Suggestion
        className="hover:bg-[var(--muted)]/20 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in"
        prompt="What does BBSC SVEC Club do?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold text-[var(--foreground)]">
          What we do?
        </span>
      </ThreadPrimitive.Suggestion>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="focus-within:border-ring/20 flex w-full flex-wrap items-end rounded-lg border bg-[var(--card)] px-4 py-2 shadow-sm transition-colors ease-in">
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder="Talk to us!"
        className="placeholder:text-[var(--muted-foreground)] max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-0 disabled:cursor-not-allowed"
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-2 w-full max-w-[var(--thread-max-width)] px-4 py-2 items-start">
      <Avatar className="col-start-1 row-span-2 self-center">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="bg-[var(--card)] text-[var(--foreground)] max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-3xl px-5 py-2.5 col-start-2 row-start-1">
        <MessagePrimitive.Content />
      </div>

      <UserActionBar />

      <BranchPicker className="col-start-2 col-span-2 row-start-2 -mr-1 justify-end" />
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex flex-col items-end col-start-3 row-start-1 mt-2.5"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="bg-[var(--card)] my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl px-4">
      <ComposerPrimitive.Input className="text-[var(--foreground)] flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none" />

      <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
        <ComposerPrimitive.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-2 w-full max-w-[var(--thread-max-width)] px-4 py-2 items-start">
      <Avatar className="col-start-1 row-span-2 self-center">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <div className="text-[var(--foreground)] max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-7 col-start-2 row-start-1">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
      </div>

      <AssistantActionBar />

      <BranchPicker className="col-start-2 col-span-2 row-start-2 -ml-2 mr-2" />
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-[var(--muted-foreground)] flex gap-1 col-start-3 row-start-1 data-[floating]:bg-[var(--background)] data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn("text-[var(--muted-foreground)] inline-flex items-center text-xs", className)}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  );
};