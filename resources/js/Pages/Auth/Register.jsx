import InputError from '@/Components/InputError';
import LoginLogo from '@/Components/Logos/LoginLogo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        title: '',
        office: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Sign Up" />

            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-6xl bg-white shadow-lg">
                    {/* left side */}
                    <div className="hidden w-1/2 bg-gray-50 p-10 xl:flex flex-col justify-center items-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                                Welcome to Arta Intranet!
                            </h2>
                            <p className="text-gray-600 mb-10">
                                A one-stop-shop platform to streamline document management, operations, and activity tracking.
                            </p>
                            <span className="mt-15 inline-block">
                                <LoginLogo />
                            </span>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="w-full xl:w-1/2 flex justify-center items-center p-10">
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-semibold text-center mb-8 text-black dark:text-white">
                                Sign Up to Arta Intranet
                            </h2>
                            <form onSubmit={submit}>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            placeholder="Enter your full name"
                                            autoFocus={true}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            placeholder="Enter your title"
                                            autoFocus={true}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Office
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="office"
                                            type="text"
                                            name="office"
                                            value={data.office}
                                            placeholder="Enter your office"
                                            autoFocus={true}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('office', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.office} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className='mb-4'>
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Re-type Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            placeholder="Re-enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="submit"
                                        value={processing ? 'Processing...' : 'Create account'}
                                        className={`w-full rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${processing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                        disabled={processing}
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <p>
                                        Already have an account?{' '}
                                        <Link
                                            href={route('login')}
                                            className="underline text-primary text-gray-600 hover:text-gray-900"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}