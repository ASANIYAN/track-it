import { BrifecaseTick, ProfileCircle } from "iconsax-react";


type ProjectCardProps = {
    title: string,
    subTitle: string,
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, subTitle}) => {
    return (
        <section className="w-[250px] flex flex-col border border-color4 bg-white dark:border-darkColor4 dark:bg-darkColor2 gap-2.5 items-start rounded-[10px] py-3.5 px-3">
            <BrifecaseTick size="24" color="#5b5c60" variant="Bold"/>
            <section>
                <h4 className="text-color1 text-sm font-medium dark:text-white"> {title} </h4>
                <span className="mt-0.5 block text-[11px] font-normal text-color2 dark:text-darkColor3"> {`(${subTitle})`} </span>
            </section>
            <section className="space-y-2 w-full">
                <p className="text-color1 text-sm text-[11px] font-normal dark:text-white flex justify-between"> <span> Progress Task</span> <span> 43 </span> </p>
                <p className="text-color1 text-sm text-[11px] font-normal dark:text-white flex justify-between"> <span> Complete Task</span> <span> 16 </span> </p>
            </section>
            <section className="flex mt-2">
                <ProfileCircle size="20" color="#5b5c60" variant="Bold"/>
                <ProfileCircle size="20" color="#5b5c60" variant="Bold"/>
                <ProfileCircle size="20" color="#5b5c60" variant="Bold"/>
            </section>
        </section>
    );
}
 
export default ProjectCard;