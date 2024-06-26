import React from 'react';
import Input from "../Input/Input";
import useCountStore from "../../store/store";
import { FormEvent, useState } from "react";
import * as yup from 'yup';
import { chronicConditionData } from "../../data/data";
import { useRouter } from "next/router";
import Button from "../Button/Button";


type Field = {
  firstName?: string,
  email?: string,
  phoneNumber?: string
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  phoneNumber: yup.string()
        .matches(phoneRegExp, 'Invalid Nigerian phone number')
        .required('Phone number is required'),
  // phoneNumber: yup.string().matches(/^234[789][01]\d{8}$/, 'Invalid Nigerian phone number').required('Phone number is required'),
  // phoneNumber: yup.string().matches(/^\+234\d{10}$/, 'Phone number must be 11 digits long').required('Phone number is required'),
  // phoneNumber: yup.string()
  // .required('Phone number is required')
  // .matches(/^\+234\d{10}$/, 'Invalid Nigerian phone number format')
  // .max(11, 'Nigerian phone number should be 14 digits including +234'),

  // phoneNumber: yup.string()
  //   .matches(/^\+234[0-9]{10}$/, 'Phone number must start with +234 and be 14 digits long')
  //   .when('+234', {
  //     is: '+234',
  //     then: yup.string().max(14, 'Phone number must be 14 digits long').required('Phone number is required'),
  //     otherwise: yup.string().max(11, 'Phone number must be 11 digits long').required('Phone number is required'),
  //   }),
  firstName: yup.string().required('First Name is required').min(3, 'Full Name must be at least 3 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
})

const GettingStartedForm = ({ appendSpreadsheet }: any): JSX.Element => {
  const router = useRouter();

  const [step, setStep] = useState('')
  const form = useCountStore((state) => state.form);
  const { count, chronicCondition } = useCountStore()
  const firstName = useCountStore((state) => state.form.firstName);
  const lastName = useCountStore((state) => state.form.lastName);
  const email = useCountStore((state) => state.form.email);
  const date = useCountStore((state) => state.form.date);
  const address = useCountStore((state) => state.form.address);
  const phoneNumber = useCountStore((state) => state.form.phoneNumber);
  const gender = useCountStore((state) => state.form.gender);
  const others = useCountStore((state) => state.form.others);
  const errorRequest = useCountStore((state) => state.error);
  const [yesOpt, setYesOpt] = useState('')
  const [error, setErrorVal] = useState<Field>({});

  const displayBtn = !phoneNumber || !firstName || !firstName ||!email || !gender || !date;

  const handleFirst = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // await schema.validate({ firstName });
    useCountStore.setState({
      form: {
        ...form,
        firstName: String(e.target.value),
      },
    });
  };

  const handleLast = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // await schema.validate({ firstName });
    useCountStore.setState({
      form: {
        ...form,
        lastName: String(e.target.value),
      },
    });
  };

  const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // await schema.validate({ email });
    useCountStore.setState({
      form: {
        ...form,
        email: String(e.target.value),
      },
    });
  };


  const handlePhoneNumber = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // await schema.validate({ phoneNumber });
    useCountStore.setState({
      form: {
        ...form,
        // phoneNumber: String(e.target.value)
        phoneNumber: String(e.target.value).replace(/\D/g, '').slice(0, 11),
      },
    });
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        date: String(e.target.value),
      },
    });
  };
  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        address: String(e.target.value),
      },
    });
  };

  const handleOthers = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        others: String(e.target.value),
      },
    });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    schema.validate({ phoneNumber, email, firstName }, { abortEarly: false })
      .then((isValid) => {
        if (isValid) {
          setStep('lief')
        }
        // Validation success
        // console.log('Valid phone number:', phoneNumber);
        // Here you can perform further actions like submitting the form
      })
      .catch((validationError) => {
        // Validation failed
        // console.error('Validation error:', validationError);
        if (validationError instanceof yup.ValidationError) {
          const errors = validationError.inner.reduce((acc: any, error: any) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
          setErrorVal(errors);
          // setErrorVal(validationError.message);
          // console.log(validationError);

        }
      });
  };

  return (
    <div className="flex justify-center w-full">
      {step &&
        <div className="flex flex-col max-w-2xl items-star w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-2xl text-[#1C1C1C] mb-2">Are you currently managing any <br /> chronic condition?</div>
            <div className="text-[#444444] text-[14px] ">Are you currently managing any chronic condition at this time or have you ever <br /> managed any chronic condition?</div>
          </div>
          <div className="flex flex-col">

            <div className="grid grid-cols-2 md:flex items-start flex-1 gap-2 w-full md:pr-32">
              <div onClick={() => setYesOpt('yes')} className={`${yesOpt == 'yes' && '!bg-[#F0E4FF] !border !border-[#9164CD]'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-xs md:text-sm font-normal leading-6 px-2 md:px-4 py-6 w-full text-center bg-white`}>Yes, I am / I have</div>
              <div onClick={() => { setYesOpt('no'); useCountStore.setState({ chronicCondition: [] }); }} className={`${yesOpt == 'no' && '!bg-[#F0E4FF] !border !border-[#9164CD]'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-xs md:text-sm font-normal leading-6 px-2 md:px-4 py-6 w-full text-center bg-white`}>No, I’m not / I have not</div>
            </div>

            {yesOpt == 'yes' && (
              <div>
                <hr className="border my-8 border-black " />
                <div className="break-all mb-10">
                  <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">What condition/s are your managing?</div>
                  <div className="text-lg md:text-lg text-[#1C1C1C] italic mb-2">(select all that apply) </div>
                </div>

                <div className="flex flex-wrap gap-2 max-w-fit">
                  {chronicConditionData.map(({ value }) => {
                    const index = chronicCondition?.indexOf(value);
                    const isSelected = index !== -1;

                    const radio = false;
                    const RBoxgrouplogic = (): void => {
                      if (radio) {
                        useCountStore.setState({ chronicCondition: [value] });
                      } else {
                        if (isSelected) {
                          chronicCondition?.splice(index, 1);
                        } else {
                          chronicCondition?.push(value);
                        }
                        useCountStore.setState({ chronicCondition: [...chronicCondition] });
                      }
                    };

                    return (
                      <div key={value}
                        onClick={RBoxgrouplogic}
                        // onClick={() =>
                        //   // useCountStore.setState({chronicCondition: ()});
                        //   setSelectedValues((prev) => {
                        //     const spr = [...prev]
                        //     const i = spr.indexOf(item.value)
                        //     if (i > -1 || isSelected) {
                        //       spr.splice(i, 1)
                        //     } else  {
                        //       spr.push(item.value)
                        //     }
                        //     return spr
                        //   })}
                        className={`${chronicCondition?.includes(value) && '!bg-[#F0E4FF] !border !border-[#9164CD]'} flex items-center cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}{" "} {isSelected && <img src='cancel.svg' className='pl-1' />}</div>
                    )
                  }
                  )}
                </div>

                <Input
                  label="Others?"
                  value={others}
                  className="my-10"
                  type="text"
                  onChange={handleOthers}
                  name="others"
                  placeholder="Please state"
                />
              </div>
            )}

            <div>
              {/* @ts-ignore */}
              <Button title={`${yesOpt == 'yes' ? 'Finish' : 'Continue'}`} disabled={!yesOpt || (yesOpt == 'yes' && !chronicCondition?.length) || (yesOpt === 'no' && chronicCondition?.length as unknown as boolean)} className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                if (yesOpt == 'yes') {
                  if (errorRequest) {
                    alert('TSomething Went Wrong');
                  } else {
                    router.push('/a-second-opinion')
                  }
                  appendSpreadsheet()
                  console.log(useCountStore.getState());
                } else if (yesOpt == 'no') {
                  useCountStore.setState({ count: count + 1 })
                }
              }} />
            </div>
          </div>

        </div>
      }

      {!step &&
        <form onSubmit={handleSubmit} className="flex flex-col max-w-2xl w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-lg md:text-2xl text-[#002355] font-bold">Getting started</div>
            <div className="text-[#444444] text-[14px] ">We would like to have a brief information about you</div>
          </div>
          <div>

            <div className="grid md:grid-cols-2 gap-3">
              <Input
                label="What’s your name?"
                className="mb-1"
                value={firstName}
                type="text"
                onChange={handleFirst}
                name="firstName"
                placeholder="First Name"
                helptext=''
              />
              <Input
                // label="Email "
                value={lastName}
                className="mb-1"
                type="text"
                onChange={handleLast}
                name="lastName"
                placeholder="Last Name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <Input
                label="Date of Birth"
                className="mb-1"
                value={date}
                type="date"
                onChange={handleDate}
                name="date"
                placeholder="DD/MM/YY"
              />

              <div className="flex flex-col">
                <label className="mb-[5px] text-[#0D1227] leading-6 flex items-center text-left text-xs md:text-sm font-normal">
                  {"What’s your gender?"}</label>

                <div className="flex items-start flex-1 gap-2 w-full">
                  <div onClick={() => useCountStore.setState({ form: { ...form, gender: "male" } })} className={`${gender == 'male' && '!bg-[#F0E4FF] !border !border-[#9164CD]'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white`}>{gender === 'male' && <img src='check.svg' className='mr-1' />} Male</div>
                  <div onClick={() => useCountStore.setState({ form: { ...form, gender: "female" } })} className={`${gender == 'female' && '!bg-[#F0E4FF] !border !border-[#9164CD]'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white`}>{gender === 'female' && <img src='check.svg' className='mr-1' />} Female</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
            <Input
                label="Email Address"
                value={email}
                className="mb-1"
                type="email"
                onChange={handleEmail}
                name="email"
                placeholder="Email Address"
              />

            <Input
              label="What’s your phone number?"
              className="mb-1"
              value={phoneNumber}
              type="text"
              onChange={handlePhoneNumber}
              name="phoneNumber"
              placeholder="  +234 | Your number goes here"
              leadingicon={<img className="pl-3" src="nigeria-flag.svg" />}
              // helptext={error}
              />
              </div>

            <div>
              <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-">Enter your address here (Optional)</label>
              <textarea value={address} onChange={handleAddress} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-[4px] border border-[#424242] focus:bg-white focus:border focus:outline-none focus:border-[#1D8EE6] placeholder:text-[#ABABAB] placeholder:leading-6" placeholder="Write your thoughts here..."></textarea>
            </div>
            {error && <div className="text-red-600 my-4 text-center text-xs">{error.phoneNumber}</div>}
            {error && <div className="text-red-600 my-4 text-center text-xs">{error.firstName}</div>}
            {error && <div className="text-red-600 my-4 text-center text-xs">{error.email}</div>}
            {/* @ts-ignore */}
            <Button title="Continue" disabled={displayBtn} className="mt-5 te w-full sm:w-[unset]" onClick={() => { handleSubmit() }} />
          </div>
        </form>
      }
    </div>
  );
};

export default GettingStartedForm;