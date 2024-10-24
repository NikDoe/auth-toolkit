'use client'

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react'
import { ScaleLoader } from 'react-spinners'

import { CardWrapper } from "@/components/auth/CardWrapper"
import { FormError } from '@/components/form/FormError';
import { FormSuccess } from '@/components/form/FormSuccess';
import { newVerificationToken } from '@/actions/new-verification-token';


function NewVerificationForm() {
	const searchParams = useSearchParams();
	const [success, setSuccess] = useState<string | undefined>();
	const [error, setError] = useState<string | undefined>();

	const token = searchParams.get('token');

	const hasFetched = useRef(false);

	const onSubmit = useCallback(() => {
		if (!token) {
			setError('токен не найден');
			return;
		}

		newVerificationToken(token)
			.then(data => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError('Произошла ошибка при подтверждение email')
			})

	}, [token])

	useEffect(() => {
		if (!hasFetched.current) {
			onSubmit();
			hasFetched.current = true;
		}
	}, [onSubmit])


	return (
		<CardWrapper
			headerlabel="Подтверждение email"
			backButtonLabel="Войти в аккаунт"
			backButtonHref="/auth/login"
		>
			<div className="w-full flex items-center justify-center">
				{!error && !success && < ScaleLoader />}
				<FormSuccess message={success} />
				<FormError message={error} />
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
