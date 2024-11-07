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
const Card = ({ title: initialTitle, id, initialColumn }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [column, setColumn] = useState(initialColumn);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(
    "<p>Click to add a description...</p>"
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const columnStyles = {
    done: "bg-green-900 border-green-500",
    doing: "bg-blue-900 border-blue-500",
    todo: "bg-yellow-900 border-yellow-500",
    backlog: "bg-red-900 border-red-500",
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
          <div className="bg-neutral-800 rounded-lg p-6 h-4/5 w-4/5">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                className="text-lg text-neutral-100 mb-4 bg-neutral-700 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <h2
                className="text-lg text-neutral-100 mb-4 px-2 py-1 rounded cursor-text"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
                <small
                  className={`ml-2 text-xs px-2 rounded-full border outline-none ${
                    columnStyles[column] || "bg-gray-500 border-gray-700"
                  }`}
                >
                  {column}
                </small>
              </h2>
            )}

            <div className="mt-4">
              <label
                className="text-neutral-200 text-sm"
                htmlFor="column-select"
              >
                Status:
              </label>
              <select
                id="column-select"
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                className="bg-neutral-700 text-neutral-100 px-3 py-1 rounded mt-2 w-full"
              >
                <option value="done">Done</option>
                <option value="doing">In Progress</option>
                <option value="todo">To Do</option>
                <option value="backlog">Backlog</option>
              </select>
            </div>
            <div className="mt-4">
              {isEditingDescription ? (
                <RichTextEditor
                  content={description}
                  onUpdate={(newContent) => setDescription(newContent)}
                  onSave={() => setIsEditingDescription(false)}
                />
              ) : (
                <div
                  className="text-sm text-neutral-400 mt-4 px-2 py-1 rounded cursor-text prose prose-invert"
                  onClick={() => setIsEditingDescription(true)}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
            <div className="mt-4 flex">
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
