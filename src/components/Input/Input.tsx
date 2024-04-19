import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
	label?: string;
	tooltip?: string;
	helptext?: string;
	inputClassName?: string;
	leadingicon?: JSX.Element
	trailingicon?: JSX.Element
	// innerRef?: any;
	inputType?: 'default' | 'success' | 'warning' | 'error';
	inputClass?: string;
	labelClass?: string;
	labelicon?: boolean;
};

export default function Input(
	props: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> &
		Props
) {
	const {
		id,
		label,
		tooltip,
		disabled,
		readOnly,
		helptext,
		// innerRef,
		className,
		leadingicon,
		trailingicon,
		inputClassName,
		inputType = 'default'
	} = props;

	const col = () => {
		let color = `[#424242]`;

		if (inputType === 'success') {
			color = '[#4BB543]';
		}
		if (inputType === 'warning') {
			color = '[#ff9966]';
		}
		if (inputType === 'error') {
			color = '[#FF0000]';
		}

		return color;
	};

	return (
		<div className={`bg- mb-3  ${className}`}>
			{label && (
				<label
					className={` mb-1 text-[#0D1227] leading-6 flex items-center text-left text-xs md:text-sm font-normal`}
					htmlFor={id}
				>
					{label}
					{tooltip && (
						<span className='text-black'>
							{/* <Icon
								icon="info-circle"
								{...labelIconProps}
								className={`inline-block ml-2 ${labelIconProps?.className}`}
							/> */}
						</span>
					)}
				</label>
			)}
			<div
				className={`relative w-full flex items-center overflow-hidden  focus-within:border-[#DEDEC disabled:bg-grey read-only:bg-grey
                ${(disabled || readOnly) && 'bg-grey border-none'
					}`}
			>
				{leadingicon && (
					<span className="ml-2 absolute ">
						{leadingicon}
					</span>
				)}
				<input
					{...props}
					className={`${leadingicon && 'ps-10'} ${!label && 'md:mt-6' }  ${trailingicon && 'pe-5 me-0'}
					border-${col()}
					border w-full px-2 py-3 rounded-[4px] focus:outline-[#] focus:outline-none focus:bg-white dark:focus:text-black focus:border-[#1D8EE6] placeholder:text-xs placeholder:font-normal placeholder:text-[#ABABAB] placeholder:leading-6 ${inputClassName}`}
				/>
				{trailingicon && (
					<span className="absolute inset-y-0 end-0 flex items-center justify-center cursor-pointer">
						{trailingicon}
					</span>
				)}
			</div>
			{helptext && (<small className={`text-xs my-2 text-
				${col()}
				${inputType === 'default' && 'text-[#DEDEC]'}
				${inputType === 'success' && 'text-[#4BB543]'}
				${inputType === 'error' && 'text-[#FF0000]'}
				${inputType === 'warning' && 'text-[#ff9966]'}
			`}>{helptext}</small>)}
		</div>
	);
};
