import { ReactElement } from "react";

import { useCycle } from "framer-motion";

import Desktop from "../navbar/desktop";
import Mobile from "../navbar/mobile";
import TopBar from "../top-bar/top-bar";

type AuthWrapperProps = {
    children: ReactElement | ReactElement[],
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const [open, cycleOpen] = useCycle(false, true);
    return (
        <section className="flex flex-nowrap h-screen">
            <Desktop />
            <Mobile open={open} />
            <section className="flex-1 overflow-y-auto pb-5">
                <TopBar cycleOpen={cycleOpen} />
                { children }
            </section>
        </section>
    );
}
 
export default AuthWrapper;