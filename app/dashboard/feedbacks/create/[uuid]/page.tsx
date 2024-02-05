import Form from '@/app/ui/feedbacks/create-form'
import Breadcrumbs from '@/app/ui/feedbacks/breadcrumbs';
import { fetchFactors, fetchJobApplicationByUUID } from '@/app/lib/actions';

export default async function Page({ params }: { params: { uuid: string } }) {
    const factors = await fetchFactors();
    // console.log(params.uuid)
    const job_application = await fetchJobApplicationByUUID(params.uuid)
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Feedbacks', href: '/dashboard/feedbacks' },
                    { label: 'Create feedback', href: '/dashboard/feedbacks/create', active: true }
                ]}
            />
            <Form factors={factors} job_application={job_application} />
        </main>
    )

}
