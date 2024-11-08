import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Delete as Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Hash as ListOrdered,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Grid as TableIcon,
  Type,
  RotateCcw as Undo,
  RotateCw as Redo,
} from "react-feather";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-neutral-700 p-2 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("bold") ? "bg-neutral-700" : ""
        }`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("italic") ? "bg-neutral-700" : ""
        }`}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("underline") ? "bg-neutral-700" : ""
        }`}
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("strike") ? "bg-neutral-700" : ""
        }`}
      >
        <Strikethrough size={16} />
      </button>

      <div className="w-px h-6 bg-neutral-700 mx-1 self-center" />

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive({ textAlign: "left" }) ? "bg-neutral-700" : ""
        }`}
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive({ textAlign: "center" }) ? "bg-neutral-700" : ""
        }`}
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive({ textAlign: "right" }) ? "bg-neutral-700" : ""
        }`}
      >
        <AlignRight size={16} />
      </button>

      <div className="w-px h-6 bg-neutral-700 mx-1 self-center" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("bulletList") ? "bg-neutral-700" : ""
        }`}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-neutral-700 ${
          editor.isActive("orderedList") ? "bg-neutral-700" : ""
        }`}
      >
        <ListOrdered size={16} />
      </button>

      <div className="w-px h-6 bg-neutral-700 mx-1 self-center" />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-neutral-700"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-neutral-700"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

const RichTextEditor = ({ content, onUpdate, onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      TextStyle,
      Color,
      Link,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert min-h-[200px] max-w-none p-4 focus:outline-none",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          onSave();
          return true;
        }
      },
    },
  });

  return (
    <div className="border border-neutral-700 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="px-4 py-2 text-xs text-neutral-400">
        Press Ctrl+Enter to save
      </div>
    </div>
  );
};
const Card = ({ title: initialTitle, id, initialColumn, onStatusChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    timeTracking: true,
    activity: true,
    labels: true,
  });

  const [column, setColumn] = useState(initialColumn || "todo");
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(
    "<p>Click to add a description...</p>"
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const toggleAccordion = (accordionName) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [accordionName]: !prev[accordionName],
    }));
  };

  const columnStyles = {
    done: "bg-green-900 border-green-500",
    doing: "bg-blue-900 border-blue-500",
    todo: "bg-yellow-900 border-yellow-500",
    backlog: "bg-red-900 border-red-500",
  };

  const handleStatusChange = (newStatus) => {
    setColumn(newStatus);
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  return (
    <div>
      <div
        draggable="true"
        className="relative mt-2 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        onClick={() => setIsDialogOpen(true)}
      >
        <p className="text-sm text-neutral-100 pe-4">{title}</p>
        <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-neutral-900"></div>
      </div>
      {isDialogOpen && (
        <div className="min-w-full min-h-screen fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-800 rounded-lg p-6 h-4/5 w-4/5 flex flex-col">
            {/* Main Grid Container */}
            <div className="grid grid-cols-3 gap-6 h-full overflow-hidden">
              {/* Left Column - Main Content (2/3 width) */}
              <div className="col-span-2 flex flex-col overflow-hidden">
                {/* Title and Add button sections stay fixed */}
                <div className="flex-shrink-0">
                  <h2 className="text-lg text-neutral-100 mb-4 px-2 py-1 rounded cursor-text flex flex-col items-start">
                    <div className="flex items-center justify-center mb-5">
                      <small
                        onClick={(e) => {
                          e.stopPropagation();
                          const statuses = ["done", "doing", "todo", "backlog"];
                          const currentIndex = statuses.indexOf(column);
                          const nextIndex =
                            (currentIndex + 1) % statuses.length;
                          handleStatusChange(statuses[nextIndex]);
                        }}
                        className={` text-xs px-2 me-3 rounded-full border outline-none cursor-pointer hover:opacity-80 transition-colors ${
                          columnStyles[column] || "bg-gray-500 border-gray-700"
                        }`}
                      >
                        {column}
                      </small>
                      <small className="text-xs text-neutral-400">
                        {" "}
                        / JIRA-PROJECT
                      </small>
                    </div>

                    {isEditingTitle ? (
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setIsEditingTitle(false)
                        }
                        className="text-lg text-neutral-100 bg-neutral-800 rounded focus:outline-none w-full"
                        autoFocus
                      />
                    ) : (
                      <span onClick={() => setIsEditingTitle(true)}>
                        {title}
                      </span>
                    )}
                  </h2>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded hover:bg-neutral-700"
                  >
                    <span>+</span>
                    <span>Add</span>
                  </button>

                  {showAddMenu && (
                    <div className="absolute left-0 mt-1 w-48 bg-neutral-800 rounded-md shadow-lg border border-neutral-700 z-10">
                      <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                          📎 Attachment
                        </li>
                        <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                          👶 Child Issue
                        </li>
                        <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                          👆 Parent Issue
                        </li>
                        <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-300">
                          🔗 Weblinks
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto pr-4">
                  <h6 className="px-2 text-sm mb-3">Description</h6>

                  {isEditingDescription ? (
                    <RichTextEditor
                      content={description}
                      onUpdate={(newContent) => setDescription(newContent)}
                      onSave={() => setIsEditingDescription(false)}
                    />
                  ) : (
                    <div
                      className="text-sm text-neutral-400 px-2 py-1 rounded cursor-text prose prose-invert"
                      onClick={() => setIsEditingDescription(true)}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </div>
              </div>

              {/* Right Column - Accordions (1/3 width) */}
              <div className="col-span-1 border-l border-neutral-700 pl-6 overflow-auto hide-scrollbar">
                {/* Details Accordion */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleAccordion("details")}
                    className="w-full flex items-center justify-between p-2 hover:bg-neutral-700 rounded"
                  >
                    <span className="text-sm font-medium text-neutral-200">
                      Details
                    </span>
                    <span>
                      {openAccordions.details ? (
                       <span class="material-symbols-outlined">
                       keyboard_arrow_down
                       </span>
                      ) : (
                        <span class="material-symbols-outlined text-sm">
                          arrow_forward_ios
                        </span>
                      )}
                    </span>
                  </button>
                  {openAccordions.details && (
                    <div className="p-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Assignee</span>
                        <span className="text-neutral-200">Unassigned</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Priority</span>
                        <span className="text-neutral-200">Medium</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Due Date</span>
                        <span className="text-neutral-200">Not set</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Time Tracking Accordion */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleAccordion("timeTracking")}
                    className="w-full flex items-center justify-between p-2 hover:bg-neutral-700 rounded"
                  >
                    <span className="text-sm font-medium text-neutral-200">
                      Time Tracking
                    </span>
                    <span>
                      {openAccordions.timeTracking ? (
                       <span class="material-symbols-outlined">
                       keyboard_arrow_down
                       </span>
                      ) : (
                        <span class="material-symbols-outlined text-sm">
                          arrow_forward_ios
                        </span>
                      )}
                    </span>
                  </button>
                  {openAccordions.timeTracking && (
                    <div className="p-2">
                      <div className="bg-neutral-700 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-neutral-400">
                        <span>4h logged</span>
                        <span>8h estimated</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Activity Accordion */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleAccordion("activity")}
                    className="w-full flex items-center justify-between p-2 hover:bg-neutral-700 rounded"
                  >
                    <span className="text-sm font-medium text-neutral-200">
                      Activity
                    </span>
                    <span>
                      {openAccordions.activity ? (
                       <span class="material-symbols-outlined">
                       keyboard_arrow_down
                       </span>
                      ) : (
                        <span class="material-symbols-outlined text-sm">
                          arrow_forward_ios
                        </span>
                      )}
                    </span>
                  </button>
                  {openAccordions.activity && (
                    <div className="p-2 space-y-3">
                      <div className="text-sm">
                        <div className="flex items-center text-neutral-400">
                          <span className="w-8 h-8 rounded-full bg-neutral-700 mr-2"></span>
                          <span>John updated status</span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Labels Accordion */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleAccordion("labels")}
                    className="w-full flex items-center justify-between p-2 hover:bg-neutral-700 rounded"
                  >
                    <span className="text-sm font-medium text-neutral-200">
                      Labels
                    </span>
                    <span>
                      {openAccordions.labels ? (
                        <span class="material-symbols-outlined">
                        keyboard_arrow_down
                        </span>
                      ) : (
                        <span class="material-symbols-outlined text-sm">
                          arrow_forward_ios
                        </span>
                      )}
                    </span>
                  </button>
                  {openAccordions.labels && (
                    <div className="p-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded bg-blue-900 text-blue-200">
                        frontend
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-green-900 text-green-200">
                        bug
                      </span>
                      <button className="px-2 py-1 text-xs rounded border border-dashed border-neutral-600 text-neutral-400 hover:border-neutral-400">
                        + Add Label
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer stays fixed at bottom */}
            <div className="flex-shrink-0 mt-4 pt-4 border-t border-neutral-700">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;
