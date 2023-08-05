type HeadingProps = {
    heading: string
}

const UnauthHeading: React.FC<HeadingProps> = ({ heading }) => {
    return (
        <h1 className="text-center text-color1 dark:text-white text-2xl xs:text-3xl font-bold"> { heading } </h1>
    );
}
 
export default UnauthHeading;