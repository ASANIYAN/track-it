import { cookies } from "next/headers";
import ProjectCard from "@/components/project-card/project-card";
import AuthWrapper from "@/components/wrappers/auth-wrapper";
import { COOKIE_NAME } from "@/constants/constants";
import { AllProject } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import AddButton from "@/components/buttons/add-button";
import { verifyAuth } from "@/utils/helpers/verify-auth";
import { redirect } from "next/navigation";

// Types
type ProjectsData = {
  message: string;
  success: boolean;
  projectsWithUsers: AllProject[];
};

// Loading component
function ProjectsSkeleton() {
  return (
    <section className="flex items-center mt-5 gap-4">
      {[1, 2, 3].map((n) => (
        <Skeleton
          key={n}
          className="h-[250px] w-[250px] rounded-[10px] border border-color4 bg-white dark:border-darkColor4 dark:bg-darkColor2"
        />
      ))}
    </section>
  );
}

// Error component
function ProjectsError() {
  return (
    <div className="p-5">
      <h2 className="text-red-600 text-xl font-semibold">
        Error Loading Projects
      </h2>
    </div>
  );
}

// Projects list component
async function ProjectsList() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token?.value) redirect("/login");
  await verifyAuth(token.value).catch(() => redirect("/login"));

  const response = await fetch(
    "http://localhost:3000/api/auth/get-all-project",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      next: { revalidate: 180 },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch projects: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as ProjectsData;

  console.log(data, "project data");
  console.log(data.projectsWithUsers[3].users[0].user, "project data");

  if (!data.projectsWithUsers?.length) {
    return (
      <div className="p-5 text-center flex flex-col gap-2.5 justify-center items-center">
        <h1 className="text-4xl font-medium text-black dark:text-white">
          {" "}
          No projects found{" "}
        </h1>
        <span className="text-black dark:text-white text-sm">
          Create your first project to get started.
        </span>
        <AddButton />
      </div>
    );
  }

  return (
    <section className="flex items-center mt-5 gap-4">
      {data.projectsWithUsers.map((project) => (
        <ProjectCard key={project._id} data={project} isClickable />
      ))}
    </section>
  );
}

// Main page component
export default async function ProjectsPage() {
  return (
    <>
      <AuthWrapper showDesktop={false} topBarText="Projects">
        <section className="p-5">
          <ProjectsList />
        </section>
      </AuthWrapper>
    </>
  );
}
