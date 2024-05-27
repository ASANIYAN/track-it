import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteEventModalProps {
  showDeleteModal: boolean;
  handleCloseModal: () => void;
  handleDelete: () => void;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  showDeleteModal,
  handleCloseModal,
  handleDelete,
}) => {
  return (
    <AlertDialog open={showDeleteModal}>
      <AlertDialogContent className="bg-white dark:bg-darkColor2 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#08c7e0] text-white"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventModal;
