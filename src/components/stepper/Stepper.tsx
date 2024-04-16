
import useCountStore from '../../store/store'

const Stepper: React.FC<{}>= () => {
    const currentStep = useCountStore((state) => state.count);
    const {complete,
        //  increment, decrement, count
    } = useCountStore()
    // const [complete, setComplete] = useState<boolean>(false)
    const steps: string[] = ['Getting started', 'Lifestyle', 'Health Checkups', 'Medical History']
    return (
        <div className=''>
            <div className='fle flex-col'>
               <img className='h-5 mb-8 ml-4' src="/sidebartop.svg" alt="public/sidebartop" />
                <div className="flex flex-col justify-between gap-4">
                    {steps.map((_, i) => {
                        return (
                                <div key={i} className={`flex flex-row justify-start items-center gap-3 pb-7 step-item ${currentStep === i + 1 && 'active'} ${i + 1 < currentStep || complete && 'complete'}`}>
                                    <div className={`step bg-white  border-white  ${currentStep === i + 1 && 'bg-black'}`}>{i + 1 < currentStep || complete
                                        ? <img src="/mark-success.svg" alt="check" />
                                        : (i + 2 < currentStep || complete
                                            ?  <img src="/mark.svg" alt="check" />
                                            :  <img src="/mark.svg" alt="check" />)}
                                    </div>

                                    <div>
                                          <p key={i} className={`${currentStep == (i + 1) ? 'font-bold text-[#1C1C1C]': '!text-[#444444]'} text-xs whitespace-nowrap`}>{_}</p>
                                    </div>
                                </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
};

export default Stepper;
