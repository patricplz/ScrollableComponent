# 🖱️ ScrollableComponent

A flexible React component that enables both **horizontal and vertical drag-to-scroll** behavior using the mouse. It’s perfect for scenarios like scrollable tables, galleries, or large content areas.

---

## ✨ Features

- Smooth horizontal and/or vertical scroll by dragging with the mouse.
- Ignores drags on interactive elements (like buttons, inputs, or links).
- Allows custom behavior via optional `onDragStart`, `onDrag`, and `onDragEnd` callbacks.
- Fully customizable with Tailwind or regular CSS.

---

## 🧩 Example: Scrollable Table

```jsx
<div className="overflow-hidden table-container">
  <ScrollableComponent horizontalScroll={true} verticalScroll={true}>
    <table className="min-w-[1000px]">
      {/* your table rows here */}
    </table>
  </ScrollableComponent>
</div>

⚙️ Props

Prop	Type	Description
children	React.ReactNode	The content to render inside the scrollable container.
className	string	Additional CSS classes for styling the outer container.
horizontalScroll	boolean	Enables horizontal dragging and scrolling. Default: false.
verticalScroll	boolean	Enables vertical dragging and scrolling. Default: false.
onDragStart	(event) => void	Optional callback triggered when dragging starts.
onDrag	(event) => void	Optional callback triggered while dragging.
onDragEnd	() => void	Optional callback triggered when dragging ends.
💡 Usage Tips
Wrap the component with a container that uses overflow-hidden to prevent scrollbars from appearing.

Use it to enhance table, div, img, or any other large content that needs to be scrollable by dragging.

Tailwind's min-w-[...] classes work great for forcing scroll.

📦 How It Works
Uses mousedown, mousemove, and mouseup under the hood.

Calculates mouse position deltas to apply custom scroll.

Applies user-select: none during drag to prevent unwanted text selection.

Ignores interactive elements like <input>, <button>, <a>, <textarea>, and those with tabindex or role.

🧼 Auto Cleanup
All global event listeners are automatically removed when the component unmounts.

📄 License
MIT — free to use and modify.
