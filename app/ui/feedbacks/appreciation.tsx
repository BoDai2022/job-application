import React from 'react';
import Link from 'next/link';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

export default function Appreciations() {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <FaceSmileIcon className="pointer-events-none  h-[36px] w-[36px] text-gray-500" />

            <h1 className="text-2xl font-semibold text-gray-800">Thank You for Your Feedback!</h1>
            <p className="mt-2 text-center text-lg text-gray-600">
                Your feedback is valuable to me and wish you the best.
            </p>
            {/* <div className="mt-6 flex justify-center gap-4">
                <Link
                    href={`/dashboard/feedbacks/`}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Submit Another Feedback.
                </Link>           
            </div> */}
        </main>
    );
}
