import React, { useState } from 'react';
import { ChevronUp, ChevronDown, BookOpen } from 'lucide-react';

export interface AccordionItem {
    id: string;
    title: string;
    content: string;
    icon?: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(id)
                    ? prev.filter(item => item !== id)
                    : [...prev, id]
            );
        } else {
            setOpenItems(prev =>
                prev.includes(id) ? [] : [id]
            );
        }
    };

    const isOpen = (id: string) => openItems.includes(id);

    return (
        <div className="w-full mx-auto space-y-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="rounded-[28px] shadow-sm border-2 border-b-[6px] border-[#EFF6FF] hover:border-primary overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200 focus:outline-none"
                    >
                        <div className="flex items-center space-x-4">
                            {item.icon && (
                                <div className="flex-shrink-0 w-12 h-12 p-3 bg-blue-50 rounded-lg flex items-center justify-center">
                                    {item.icon}
                                </div>
                            )}
                            <h3 className="font-normal leading-relaxed">
                                {item.title}
                            </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                            {isOpen(item.id) ? (
                                <ChevronUp className="w-5 h-5 transition-transform duration-200" />
                            ) : (
                                <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                            )}
                        </div>
                    </button>

                    <div
                        className={`transition-all duration-300 ease-in-out ${
                            isOpen(item.id)
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                    >
                        <div className="px-6 pb-5 pt-2">
                            <div className="text-left font-normal text-sm">
                                {item.content}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};