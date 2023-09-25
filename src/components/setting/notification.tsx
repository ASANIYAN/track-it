import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomSelect } from "../inputs/custom-select";
import NotificationHeading from "./notification-heading";
import CustomTimeInput from '../inputs/custom-time-input';
import CustomRadio from '../inputs/custom-radio';

const options =  [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
];

const validationSchema = yup.object().shape({
    notification: yup.string(),
    from:  yup.string(),
    to:  yup.string(),
    
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

    return (
        <section>
            <NotificationHeading text="Allow Notification" />
                <section className='flex items-center gap-5 mt-2.5'>
                    <section className='w-[200px]'>
                        <CustomSelect
                            method={method}
                            name="notification"
                            options={options} 
                        />
                    </section>
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
                </section>
                <p className='text-xs font-normal text-color7 dark:text-white '> You won&apos;t receive notifications on Saturday or Sunday. </p>

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