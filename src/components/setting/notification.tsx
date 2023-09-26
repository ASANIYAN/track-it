import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomSelect } from "../inputs/custom-select";
import NotificationHeading from "./notification-heading";
import CustomTimeInput from '../inputs/custom-time-input';
import CustomRadio from '../inputs/custom-radio';
import { useEffect, useState } from 'react';
import { days } from '@/constants/objects';

const options =  [
    { label: 'Daily', value: 'daily' },
    { label: 'Custom', value: 'custom' },
];

const validationSchema = yup.object().shape({
    notification: yup.string().required(),
    from: yup.string().matches(
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        'Invalid time format'
      ).required(),
    to: yup.string().matches(
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        'Invalid time format'
      ).required(),
    
});

export type NotificationFormValues = {
    notification: string,
    from: string,
    to: string,
}

const Notification = () => {
    const method = useForm<NotificationFormValues> ({
        resolver: yupResolver(validationSchema)
    });
    const { getValues, watch } = method;
    const [isCustom, setIsCustom] = useState<boolean>(false);

    const watchNotification = watch("notification");

    useEffect(() => {
        if (getValues("notification").trim().toLowerCase() === "custom") {
            setIsCustom(true);
        } else {
            setIsCustom(false);
        }
        // console.log(getValues("notification"));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchNotification])

    return (
        <section>
            <section className='text-center md:text-start'>
                <NotificationHeading text="Allow Notification" />
            </section>
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center md:justify-start items-center gap-5 mt-2.5'>
                    <section className='w-[200px]'>                              
                        <CustomSelect
                            method={method}
                            name="notification"
                            options={options} 
                        />
                    </section>
                    { !isCustom &&
                        <>
                            <section className='w-[200px]'>
                                <CustomTimeInput 
                                    name='from'
                                    label='From'
                                    method={method}
                                />
                            </section>
                            <section className=' border-black w-[200px]'>
                                <CustomTimeInput 
                                    name='to'
                                    label='To'
                                    method={method}
                                />
                            </section>
                        </>
                    }
                </section>
                { !isCustom &&
                    <p className='text-xs font-normal text-color7 dark:text-white mt-4 text-center sm:text-start'> You won&apos;t receive notifications on Saturday or Sunday. </p>
                }
                { isCustom &&
                    <section className='mt-5'>
                        { days.map((day) => (
                            <section key={day} className='mt-4 mx-auto flex flex-wrap items-center justify-center md:justify-start gap-y-2.5 gap-x-20'>
                                <p className='xs:w-[150px] xl:w-[200px]'> {day} </p>
                                <section className='flex flex-wrap items-center gap-y-2.5 gap-x-4'>
                                    <section className='xl:w-[200px]'>
                                        <CustomTimeInput 
                                            name='from'
                                            method={method}
                                        />
                                    </section>
                                    <section className='xl:w-[200px]'>
                                        <CustomTimeInput 
                                            name='to'
                                            method={method}
                                        />
                                    </section>
                                </section>
                            </section>

                        ))}
                    </section>
                }

                <section className='mt-8'>
                    <NotificationHeading text='E-mail Notification' />
                    <section className='mt-5'>
                        <CustomRadio 
                            name='activity' 
                            label='Activity updates' 
                            method={method} 
                        />
                        <CustomRadio 
                            name='mentions' 
                            label='Mentions only' 
                            method={method} 
                        />
                        <CustomRadio 
                            name='assigned' 
                            label='Assigned a new task' 
                            method={method} 
                        />
                        <CustomRadio 
                            name='tasks' 
                            label='Tasks due today' 
                            method={method} 
                        />
                    </section>
                </section>
                
                <section className='mt-8'>
                    <NotificationHeading text='Browser Notification' />
                    <section className='mt-5'>
                        <CustomRadio 
                            name='task' 
                            label='Task Update' 
                            method={method} 
                        />
                        <CustomRadio 
                            name='mentions' 
                            label='Mentions only' 
                            method={method} 
                        />
                        <CustomRadio 
                            name='assigned' 
                            label='Assigned a new task' 
                            method={method} 
                        />
                    </section>

                </section>
        </section>
    );
}
 
export default Notification;