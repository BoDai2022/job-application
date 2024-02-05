'use server'
import { z } from 'zod';
import { Factor } from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
const FormSchema = z.object({
    job_application: z.string(),
    factors: z.array(z.string(), {
        invalid_type_error: "Please select factors."
    }).min(1, "Please select at least one factor"),
    detailed_feedback: z.string().optional(),
})
const CreateFeedback = FormSchema;
export type State = {
    errors?: {
        job_application?: string[];
        factors?: string[];
        detail?: string[];
    };
    message?: string | null;
}
export async function createFeedback(prevState: State, formData: FormData) {
    const validatedFields = CreateFeedback.safeParse({
        job_application: formData.get("job_application"),
        factors: formData.getAll('factors'),
        detailed_feedback: formData.get('detail'),
    })
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Feedback.',
        };
    }
    const data = validatedFields.data;
    // invoke backend api
    const endpoint = process.env.POST_FEEDBACK_URL;
    if (!endpoint) {
        console.error('POST_FEEDBACK_URL is not defined');
        throw new Error("POST_FEEDBACK_URL is not defined");
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer YOUR_TOKEN', // If needed
        },
        body: JSON.stringify(data)
    });
    if(!response.ok){
        console.error('HTTP Error: ' + response.status);
        throw new Error(response.statusText)
    }
    redirect('/dashboard/feedbacks/appreciations');
}

export async function fetchFactors() {
    const endpoint = process.env.GET_ALL_FACTORS_URL;
    if (!endpoint) {
        console.error('GET_ALL_FACTORS_URL is not defined');
        throw new Error("GET_ALL_FACTORS_URL is not defined");
    }
    // const res = await fetch(endpoint, { cache: 'force-cache' });
    const res = await fetch(endpoint, { next: { revalidate: 10*3600 } });

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json();
    // console.log(data["results"])
    const factors: Factor[] = data["results"].map((item: Factor) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description
        };
    });
    // console.log(factors)
    return factors
}

export async function fetchJobApplicationByUUID(uuid: string) {
    const endpoint = process.env.GET_JOB_APPLICATION_BY_UUID_URL;
    if (!endpoint) {
        console.error('GET_JOB_APPLICATION_BY_UUID_URL is not defined');
        throw new Error("GET_JOB_APPLICATION_BY_UUID_URL is not defined")
    }
    const res = await fetch(endpoint + uuid, { cache: 'force-cache' });
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json();
    // console.log(data)
    return data
}