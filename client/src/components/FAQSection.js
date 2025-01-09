import React, { useState } from 'react';
import { Plus, Minus } from 'react-feather';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to track which FAQ is open

    const faqs = [
        {
            question: "How to generate Figma personal access token?",
            answer: [
                "Figma is a web-based UI/UX design application that allows for collaborative design.",
                <img src="path/to/figma-image.png" alt="Figma Example" className="mt-2" />
            ]
        },
        {
            question: "How to find and copy my team URL?",
            answer: [
                "You can use the Activity Feed to track changes made to your designs in Figma.",
                <img src="path/to/activity-feed-image.png" alt="Activity Feed Example" className="mt-2" />
            ]
        },
        {
            question: "Can I review my drafts with this app?",
            answer: [
                "Yes, Figma has a mobile app that allows you to view and comment on designs.",
                <img src="path/to/mobile-app-image.png" alt="Figma Mobile App" className="mt-2" />
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the open index
    };

    return (
        <div className="w-full max-w-[450px]">
            <h1 className='font-geist text-base font-medium text-slate-900'>FAQs</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200">
                    <div 
                        className="flex justify-between items-center cursor-pointer py-4 w-full"
                        onClick={() => toggleFAQ(index)}
                    >
                        <h3 className="font-geist text-sm text-slate-800">{faq.question}</h3>
                        {openIndex === index ? <Minus size={16} stroke-width="1" /> : <Plus size={16} stroke-width="1" />} {/* Use Chevron icons */}
                    </div>
                    {openIndex === index && (
                        <div className="faq-details p-2 bg-gray-100 rounded-md mt-1 transition-all duration-300 ease-in-out" style={{ height: 'auto', opacity: 1 }}>
                            {faq.answer.map((item, idx) => (
                                <div key={idx}>{item}</div> // Render each item in the answer array
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQSection;