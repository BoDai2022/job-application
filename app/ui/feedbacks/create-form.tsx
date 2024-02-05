"use client"

// import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    UserCircleIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createFeedback } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Factor } from '@/app/lib/definitions';
import { State } from '@/app/lib/actions';

export default function Form({ factors, job_application }: { factors: Factor[], job_application: any }) {
    // console.log(factors)
    const initialState: State = { message: "null", errors: {} };
    const [state, dispatch] = useFormState(createFeedback, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* job_application*/}
                <div className="mb-4">
                    {/* <label htmlFor="job" className="mb-2 block text-sm font-medium">
                        Choose job
                    </label> */}
                    <div className="flex items-center gap-4">
                        <UserCircleIcon className="pointer-events-none  h-[18px] w-[18px] text-gray-500" />
                        <input type="hidden" name="job_application" value={job_application.id}></input>
                        <span className="block text-lg font-bold">
                            {job_application.job_title}
                        </span>
                        <span className="block">
                            at
                        </span>
                        <span className="block text-lg font-bold">
                            {job_application.company_name}
                        </span>
                        {/* Display other job details as needed */}
                    </div>
                </div>

                {/* feedback factors */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Please choose factors for this decision-making
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex flex-wrap gap-4">
                            {
                                factors.map((factor: Factor) => (
                                    <div key={factor.name} className="flex items-center">
                                        <input
                                            // id={factor.name}
                                            name="factors"
                                            type="checkbox"
                                            value={factor.id}
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                            aria-describedby="status-error"
                                        />
                                        <label
                                            htmlFor={factor.name}
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                            {factor.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        <div id="status-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.factors &&
                                state.errors.factors.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </fieldset>
                {/* feedback detail */}
                <div className="mb-4">
                    <label htmlFor="detail" className="mb-2 block text-sm font-medium">
                        Any other thoughts or observations are appreciated
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="detail"
                                name="detail"
                                placeholder="Any thoughts or advices are appreciated..."
                                className="peer block w-full pl-12 rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-700 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                aria-describedby="detail-error"
                                rows={4}>
                            </textarea>
                            <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/4 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                {/* <Link
                    href="/dashboard/feedbacks"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link> */}
                <Button type="submit">Create Feedback</Button>
            </div>
        </form>
    );
}
