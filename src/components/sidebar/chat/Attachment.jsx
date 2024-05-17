import React from "react";
import { AttachmentIcon } from "../../../assets/svg";
import Menu from "./Attachments/Menu";

export default function Attachment({
  showAttachments,
  setShowAttachments,
  setshowPicker,
}) {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setshowPicker(false);
          setShowAttachments((prev) => !prev);
        }}
        type="button"
        className="btn"
      >
        <AttachmentIcon className={"dark:fill-dark_svg_1"} />
      </button>

      {showAttachments && <Menu />}
    </li>
  );
}
