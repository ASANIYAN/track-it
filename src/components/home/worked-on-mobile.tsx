import CheckBox from "../inputs/checkbox/checkbox";

const WorkedOnMobile = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
    }
    return (
        <section className="border-b border-b-color4 bg-white p-2 dark:border-b-darkColor4 dark:bg-darkColor2 flex items-center justify-between">
            <section className="flex items-center gap-2">
                <CheckBox 
                    name="workedOnCheck"
                    handleChange={handleChange}
                />
                <span className="text-xs xs:text-sm font-normal text-color1 dark:text-white"> Design Stage</span>
            </section>
            <section className="flex items-center gap-10">
                <div className="flex gap-1 items-center">
                    <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] "></div>
                    <span className="text-color7 text-[12px] dark:text-darkColor6"> Web Design </span>
                </div>
                <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6"> Thursday </p>
            </section>
        </section>
    );
}
 
export default WorkedOnMobile;