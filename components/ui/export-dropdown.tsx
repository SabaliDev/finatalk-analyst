// ExportDropdown.tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";

interface ExportDropdownProps {
  title: string;
  onExportToPNG: (filename: string) => void;
  onExportToPDF: (filename: string) => void;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  title,
  onExportToPNG,
  onExportToPDF,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 text-sm">
          Export Options
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => onExportToPNG(`${title}.png`)}>
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onExportToPDF(`${title}.pdf`)}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
