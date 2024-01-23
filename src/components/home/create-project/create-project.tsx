import { useState } from "react";
import FirstStep from "./first-step";

type stepOptions = "first-step" | "second-step";
type CreateProjectProps = {
  handleCloseCreateProjectModal: () => void;
};

const CreateProject: React.FC<CreateProjectProps> = ({
  handleCloseCreateProjectModal,
}) => {
  const [step, setStep] = useState<stepOptions>("first-step");
  const steps = ["first-step", "second-step"];

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20" />
      <section className="z-40">
        {step === steps[0] && (
          <FirstStep
            handleCloseCreateProjectModal={handleCloseCreateProjectModal}
          />
        )}
      </section>
    </>
  );
};

export default CreateProject;
