import { Ref } from "react";
import Button from "../buttons/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type DeleteProjectModal = {
  children: React.ReactNode;
  handleDelete: () => void;
  buttonRef: Ref<HTMLButtonElement> | undefined;
};

const DeleteProjectModal = (props: DeleteProjectModal) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger ref={props.buttonRef} asChild>
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white  dark:bg-darkColor1 border dark:border-darkColor1 font-poppins">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Are you sure want to delete this project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full max-w-[120px] bg-transparent text-color1 dark:text-white border dark:border-white border-color1 hover:bg-transparent">
            Cancel
          </AlertDialogCancel>
          <Button
            handleClick={props.handleDelete}
            className="w-full max-w-[120px] bg-color6 hover:bg-color6 text-white"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectModal;
