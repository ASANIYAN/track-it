"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

import { AllProject } from "@/types/types";
import { useProjectStore } from "@/store/project-store";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

import {
  useAddProjectToFavourite,
  useDeleteProject,
} from "@/tanstack/mutations/mutations";
import DeleteProjectModal from "../home/delete-project-modal";
import { useRouter } from "next/navigation";
import { useProjectIDStore } from "@/store/selected-project-store";

const EditProjectModal = dynamic(() => import("../home/edit-project-modal"), {
  ssr: false,
});

const RenameProjectModal = dynamic(
  () => import("../home/rename-project-modal"),
  { ssr: false }
);

type ProjectCardOptionProps = {
  data: AllProject;
};

const ProjectCardOption: React.FC<ProjectCardOptionProps> = ({ data }) => {
  const router = useRouter();

  const { setSelectedProjectId } = useProjectIDStore();

  const { setSingleProject } = useProjectStore();

  const { mutate: deleteProject } = useDeleteProject(data._id);
  const { mutate: addRemoveProjectFavourite } = useAddProjectToFavourite();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [editProjectModal, setEditProjectModal] = useState<boolean>(false);
  const [renameProjectModal, setRenameProjectModal] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen((open) => !open);

  const handleCardClosure = () => setOpen(false);
  const ref = useOutsideClick(handleCardClosure);

  const handleDeleteProject = () => {
    deleteProject(data._id);
    setOpen(false);
    buttonRef.current?.click();
  };

  const handleRenameProject = () => {
    setSingleProject(data);
    setRenameProjectModal(true);
  };

  const handleRemoveProjectFromFavourite = () => {
    const payload = {
      id: data._id,
      favourite: false,
    };
    addRemoveProjectFavourite(payload);
    setOpen(false);
  };

  const handleAddProjectToFavourite = () => {
    const payload = {
      id: data._id,
      favourite: true,
    };
    addRemoveProjectFavourite(payload);
    setOpen(false);
  };

  const handleEditProjectDetails = () => {
    setSingleProject(data);
    setEditProjectModal(true);
  };

  const handleGoToProject = (id: string) => () => {
    router.push(`/project/${id}`);
    setSelectedProjectId(id);
  };

  const projectOptions = [
    { name: "Delete Project" },
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
            open ? "h-fit py-4 opacity-100 z-10" : "h-0 opacity-0 -z-10"
          } transition-all absolute top-10 right-2.5 flex flex-col 
                    justify-start gap-1 sm:gap-2 rounded-[10px] bg-white shadow-four text-color1 p-2 text-[11px] sm:text-[13px] font-normal 
                    w-xl dark:bg-darkColor4 dark:shadow-darkThree dark:text-white`}
        >
          {projectOptions.map((option) => (
            <>
              {option.name === "Delete Project" ? (
                <DeleteProjectModal
                  buttonRef={buttonRef}
                  handleDelete={handleDeleteProject}
                >
                  <p
                    key={option.name}
                    className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
                    onClick={option.handler}
                  >
                    {option.name}{" "}
                  </p>
                </DeleteProjectModal>
              ) : (
                <p
                  key={option.name}
                  className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
                  onClick={option.handler}
                >
                  {option.name}
                </p>
              )}
            </>
          ))}
          {data?.favourite === true && (
            <p
              key={otherProjectOptions[0].name}
              className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
              onMouseDown={otherProjectOptions[0].handler}
            >
              {" "}
              {otherProjectOptions[0].name}{" "}
            </p>
          )}
          {data?.favourite === false && (
            <p
              key={otherProjectOptions[1].name}
              className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
              onMouseDown={otherProjectOptions[1].handler}
            >
              {" "}
              {otherProjectOptions[1].name}{" "}
            </p>
          )}

          <p
            className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"
            onMouseDown={handleGoToProject(data._id)}
          >
            View Project
          </p>
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
