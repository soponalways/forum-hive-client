import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FaArrowDown } from 'react-icons/fa';

const FAQ = () => {
    const axios = useAxios();
    const { data: faqs } = useQuery({
        queryKey: ['faqs'],
        queryFn: async () => {
            const res = await axios.get('/faqs');
            return res.data;
        }
    });

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <div>
                <h1 className='text-xl md:text-2xl font-semibold text-primary'>Frequently Asked Questions</h1>
            </div>
            <div>
                {faqs?.map((faq, index) => (
                    <div key={faq._id} className="space-y-2 md:space-y-3 lg:space-y-4 my-4 md:my-6">
                        <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                            <AccordionSummary
                                expandIcon={<FaArrowDown />}
                                aria-controls={`panel${index + 1}bh-content`}
                                id={`panel${index + 1}bh-header`}
                            >
                                <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ; 