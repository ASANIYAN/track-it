type DividerProps = {
    className?: string
}

const Divider: React.FC<DividerProps> = ({ className }) => {
    return (        
        <div className={`border-b border-b-color4 w-full h-0.5 dark:border-b-darkColor5 mt-6 ${className}`}></div>
    );
}
 
export default Divider;