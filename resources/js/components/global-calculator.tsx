import React, { useState } from 'react';

const PAGE_WORDS = 275;
const BASE_PRICE_PER_PAGE = 10; // Placeholder, adjust as needed

const GlobalCalculator = () => {
    const [title, setTitle] = useState('');
    const [academicLevel, setAcademicLevel] = useState('');
    const [deadline, setDeadline] = useState('');
    const [pages, setPages] = useState(1);

    // Placeholder price calculation logic
    const calculateAmount = () => {
        // You can enhance this logic based on academicLevel, deadline, etc.
        return (pages * BASE_PRICE_PER_PAGE).toFixed(2);
    };

    const incrementPages = () => setPages((p) => p + 1);
    const decrementPages = () => setPages((p) => (p > 1 ? p - 1 : 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., navigate to order page or show summary)
    };

    return (
        <section className="relative">
            <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">Calculate Your Order</h2>

                <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-normal text-black/50">
                        Paper Title/Topic
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition duration-300 focus:border-indigo-500 focus:ring-indigo-500"
                        name="title"
                        id="title"
                        placeholder="Enter the title or topic of your paper"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="academicLevel" className="mb-1 block text-sm font-normal text-black/50">
                        Academic Level
                    </label>
                    <select
                        id="academicLevel"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 transition duration-300 focus:border-indigo-500 focus:ring-indigo-500"
                        name="academicLevel"
                        value={academicLevel}
                        onChange={(e) => setAcademicLevel(e.target.value)}
                    >
                        <option value="">Select Academic Level</option>
                        <option value="highschool">High School</option>
                        <option value="college">College</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="masters">Masters/Post-graduate</option>
                        <option value="phd">Ph.D</option>
                        <option value="corporate">Corporate</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="flex items-center justify-between bg-white py-2">
                    <div>
                        <label htmlFor="deadline" className="mb-1 block text-sm font-normal text-black/50">
                            Deadline
                        </label>
                        <select
                            id="deadline"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition duration-300 focus:border-indigo-500 focus:ring-indigo-500"
                            name="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        >
                            <option value="">Select deadline</option>
                            <option value="6">6 Hours</option>
                            <option value="12">12 Hours</option>
                            <option value="24">24 Hours</option>
                            <option value="48">48 Hours</option>
                            <option value="72">3 Days</option>
                            <option value="120">5 Days</option>
                            <option value="168">7 Days</option>
                            <option value="240">10 Days</option>
                        </select>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label className="block text-sm font-normal text-black/50">Pages</label>
                            <label className="mb-2 block text-sm font-normal text-black/50">{pages * PAGE_WORDS} words</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 rounded-lg border">
                                <button
                                    type="button"
                                    onClick={decrementPages}
                                    className="bg-primary hover:bg-primary/80 flex h-10 w-10 items-center justify-center rounded-l-lg text-white transition duration-300"
                                >
                                    -
                                </button>
                                <span className="text-xl font-normal text-gray-800">{pages}</span>
                                <button
                                    type="button"
                                    onClick={incrementPages}
                                    className="bg-primary hover:bg-primary/80 flex h-10 w-10 items-center justify-center rounded-r-lg text-white transition duration-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-lg bg-indigo-50 p-4">
                    <p className="text-sm text-gray-700">
                        Estimated Price:
                        <span className="text-primary ml-2 text-2xl font-bold">${calculateAmount()}</span>
                    </p>
                </div>

                <div>
                    <a
                        href="/client/orders/create"
                        className="bg-primary hover:bg-primary/80 inline-block w-full rounded-lg px-4 py-3 text-center font-semibold text-white transition duration-300 ease-in-out"
                    >
                        Place Order
                    </a>
                </div>
            </form>
        </section>
    );
};

export default GlobalCalculator;
