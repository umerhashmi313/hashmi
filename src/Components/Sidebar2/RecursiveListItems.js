import React, { useState } from "react";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  Box,
  ListItemIcon,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  PlayCircle,
  QuizOutlined,
  NotesOutlined,
} from "@mui/icons-material";

/**
 * Renders a single item which can be:
 *  - A "section" (with possible nested ordered_content).
 *  - A leaf node: "video", "quiz", "reading_material", etc.
 */
const RecursiveListItem = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.ordered_content) && item.ordered_content.length > 0;

  const handleClick = () => {
    setOpen(!open);
  };

  // Decide how to label this item
  const label = item.title || item.name || "Untitled";

  // If it's a "section", we treat it as a collapsible item:
  if (item.type === "section") {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ pl: 2 + level * 2 }}>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
            }
          />
          {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItemButton>

        {hasChildren && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.ordered_content.map((child) => (
                <RecursiveListItem key={child.id} item={child} level={level + 1} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  // Otherwise, it's a leaf node (video, quiz, reading_material, etc.)
  // Render it as a non-collapsible ListItem.
  let icon = null;
  if (item.type === "video") icon = <PlayCircle />;
  else if (item.type === "quiz") icon = <QuizOutlined />;
  else icon = <NotesOutlined />; // fallback or reading_material icon

  return (
    <ListItemButton sx={{ pl: 4 + level * 2 }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default RecursiveListItem;
