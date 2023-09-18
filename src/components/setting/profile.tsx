import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Camera, ProfileCircle, Trash } from "iconsax-react";
import CustomRadio from '../inputs/custom-radio';


const validationSchema = yup.object().shape({
    gender: yup.string().required("please select a gender"),
});

export type ProfileFormValues = {
    gender: string,
}

const Profile = () => {
    const method = useForm<ProfileFormValues> ({
        resolver: yupResolver(validationSchema)
    });

    return (
        <section>
            <section className="flex items-center justify-center gap-5">
                <Camera size={22} color="#878B8F" />
                <ProfileCircle size={100} color="#878B8F" />
                <Trash size={22} color="#878B8F" />
            </section>
            <section className='flex items-center justify-center mt-5 gap-5'>
                <CustomRadio name={'gender'} label={'Male'} method={method} />
                <CustomRadio name={'gender'} label={'Female'} method={method} />
                <CustomRadio name={'gender'} label={'Other'} method={method} />
            </section>
        </section>
    );
}
 
export default Profile;