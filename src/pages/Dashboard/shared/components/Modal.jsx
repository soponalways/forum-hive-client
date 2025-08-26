import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import React from 'react';

const Modal = ({ handleOpen , open , header= "Sopon islam", children}) => {
    return (
        <div className=''>
            <Dialog className='bg-gray-600 top-1/2 w-4/5 mx-auto ' open={open} handler={handleOpen}>
                <DialogHeader className='text-primary place-content-center md:text-3xl lg:text-4xl'>{header}</DialogHeader>
                <DialogBody>
                    {children}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 cursor-pointer btn hover:btn-primary"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button className='cursor-pointer btn hover:btn-primary' variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Modal;