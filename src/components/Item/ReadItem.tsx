import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "../chakra";

export type ReadItemProps = {
  children: React.ReactNode;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const ReadItemWrapper = ({
  children,
  onEdit,
  onRemove,
}: ReadItemProps) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <HStack
      justifyContent="space-between"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {children}
      {/* Should hide until hover */}
      <HStack spacing="0" opacity={showActions ? "100%" : "0%"}>
        <IconButton aria-label="Edit" onClick={onEdit} icon={<EditIcon />} />
        <IconButton
          aria-label="Remove"
          onClick={onRemove}
          icon={<DeleteIcon />}
        />
      </HStack>
    </HStack>
  );
};
