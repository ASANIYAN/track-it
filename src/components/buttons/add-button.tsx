"use client";

import { Add } from "iconsax-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const CreateProject = dynamic(
  () => import("../home/create-project/create-project"),
  { ssr: false }
);

const AddButton = () => {
  const [displayProjectModal, setDisplayProjectModal] =
    useState<boolean>(false);

  const handleOpenCreateProjectModal = () => setDisplayProjectModal(true);
  const handleCloseCreateProjectModal = () => setDisplayProjectModal(false);

  return (
    <>
      <section className="rounded-[50%] text-white w-[32px] h-[32px] bg-color6 flex items-center justify-center">
        <Add
          size="24"
          color="#FFF"
          onClick={handleOpenCreateProjectModal}
          role="button"
        />
      </section>
      {displayProjectModal && (
        <CreateProject
          handleCloseCreateProjectModal={handleCloseCreateProjectModal}
        />
      )}
    </>
  );
};

export default AddButton;
