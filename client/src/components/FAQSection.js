import React, { useState } from 'react';
import { Plus, Minus } from 'react-feather';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to track which FAQ is open

    const faqs = [
        {
            question: "What is Figma Recap?",
            answer: [
                "Figma Recap is a simple app built on Figma's REST API that creates an activity feed just for you. It scans all the files in your team, tracks every edit of yours, and compiles them into a heatmap. See your design activity from day one in a fun, visual way!",
                "Examples:",
                <img src="../Examples/example_1.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                <img src="../Examples/example_2.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                <img src="../Examples/example_3.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
            ]
        },
        {
            question: "How to generate Figma personal access token?",
            answer: [
                "1. Login to your Figma account.",
                "2. Head to Settings from the top-left menu inside Figma.",
                <img src="../FAQ/token_01.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "3. Find Personal access tokens under security section.",
                <img src="../FAQ/token_02.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "4. Click Generate new token to open the configuration modal.",
                "5. Set the expiration and scopes for the token. Change the scope to write for all those settings.",
                <img src="../FAQ/token_03.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "6. Give your token a name and click Generate token.",
                "7. Figma will generate a token for you. This is your only chance to copy it, so be sure to save it in a secure place.",
                <img src="../FAQ/token_04.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
            ]
        },
        {
            question: "How to find and copy my team URL?",
            answer: [
                "1. Log in to your Figma account.",
                "2.	On the Free and Professional plans, click on “All projects” in the left sidebar under your team name.",
                <img src="../Url/url_01.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "3.	On the Organization plan, click on “All teams” under your organization name.",
                <img src="../Url/url_02.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "4.	On Free and Professional plans, right-click on your team name and copy the team URL.",
                <img src="../Url/url_03.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
                "5.	On the Organization plan, find your team in the list, right-click on it, and copy the team URL.",
                <img src="../Url/url_04.png" alt="Figma Example" className="mb-3 border border-slate-200 rounded-md" />,
            ]
        },
        {
            question: "What if I have multiple teams?",
            answer: [
                "Figma Recap currently supports one team at a time. If you have multiple teams, please generate the recap separately for each team. We're working on adding support for multiple teams in a single recap soon.",
            ]
        },
        {
            question: "Does Figma Recap check draft files?",
            answer: [
                "Not right now. Figma Recap currently works with team files only, but we're working on adding support for drafts in the near future.",
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the open index
    };

    return (
        <div className="w-full max-w-[450px]">
            <h1 className='font-geist text-base font-medium text-slate-950'>FAQs</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 transition-all duration-300 ease-in">
                    <div 
                        className="flex justify-between items-center cursor-pointer py-4 w-full "
                        onClick={() => toggleFAQ(index)}
                    >
                        <h3 className="font-geist font-medium text-sm text-slate-700 hover:text-slate-900">{faq.question}</h3>
                        {openIndex === index ? <Minus size={16} stroke-width="1" className="hover:text-slate-900" /> : <Plus size={16} stroke-width="1" className="hover:text-slate-900"/>} {/* Use Chevron icons */}
                    </div>
                    {openIndex === index && (
                        <div className="font-geist text-sm pb-4 flex flex-col gap-2 rounded-md  ease-in-out text-slate-700 leading-6 tracking-wide " style={{ height: 'auto', opacity: 1 }}>
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