export interface IModalState {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  init: (isOpen: boolean, onOpen: () => void, onOpenChange: () => void) => void;
}