import { useProjectStore } from "@/store/project-store";
import { AllProject } from "@/types/types";
import useOutsideClick from "@/utils/hooks/useOutsideClick";
import Image from "next/image";
import { useState } from "react";
import EditProjectModal from "../home/edit-project-modal";
import RenameProjectModal from "../home/rename-project-modal";

type ProjectCardOptionProps = {
  data: AllProject;
};

const ProjectCardOption: React.FC<ProjectCardOptionProps> = ({ data }) => {
  const { setSingleProject } = useProjectStore();

  const [editProjectModal, setEditProjectModal] = useState<boolean>(false);
  const [renameProjectModal, setRenameProjectModal] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen((open) => !open);

  const handleCardClosure = () => setOpen(false);
  const ref = useOutsideClick(handleCardClosure);

  const handleDeleteProject = () => {};
  const handleRenameProject = () => {
    setSingleProject(data);
    setRenameProjectModal(true);
  };
  const handleRemoveProjectFromFavourite = () => {};
  const handleAddProjectToFavourite = () => {};

  const handleEditProjectDetails = () => {
    setSingleProject(data);
    setEditProjectModal(true);
  };

  const projectOptions = [
    { name: "Delete Project", handler: handleDeleteProject },
    { name: "Rename Project", handler: handleRenameProject },
    { name: "Edit Project Details", handler: handleEditProjectDetails },
  ];

  const otherProjectOptions = [
    {
      name: "Remove from Favourites",
      handler: handleRemoveProjectFromFavourite,
    },
    {
      name: "Add to Favourites",
      handler: handleAddProjectToFavourite,
    },
  ];

  return (
    <>
      <section ref={ref}>
        <div className="">
          <Image
            width={16}
            height={16}
            src={"/assets/icons/ellipsis.svg"}
            alt="ellipsis"
            className="cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <section
          className={`w-[200px] ${
            open
              ? "h-[190px] sm:h-[225px] opacity-100 z-10"
              : "h-0 opacity-0 z-0"
          } transition-all absolute top-10 right-2.5 flex flex-col 
                    justify-start gap-1 sm:gap-2 rounded-[10px] bg-white shadow-four text-color1 p-2 text-[11px] sm:text-[13px] font-normal 
                    w-xl dark:bg-darkColor4 dark:shadow-darkThree dark:text-white`}
        >
          {projectOptions.map((option) => (
            <p
              key={option.name}
              className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
              onClick={option.handler}
            >
              {" "}
              {option.name}{" "}
            </p>
          ))}
          {data?.favourite === true && (
            <p
              key={otherProjectOptions[0].name}
              className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
              onClick={otherProjectOptions[0].handler}
            >
              {" "}
              {otherProjectOptions[0].name}{" "}
            </p>
          )}
          {data?.favourite === false && (
            <p
              key={otherProjectOptions[1].name}
              className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
              onClick={otherProjectOptions[1].handler}
            >
              {" "}
              {otherProjectOptions[1].name}{" "}
            </p>
          )}
        </section>
      </section>
      {editProjectModal && (
        <EditProjectModal setEditProjectModal={setEditProjectModal} />
      )}
      {renameProjectModal && (
        <RenameProjectModal setRenameProjectModal={setRenameProjectModal} />
      )}
    </>
  );
};

export default ProjectCardOption;
