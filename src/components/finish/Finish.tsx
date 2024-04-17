import { useEffect } from "react"
import useCountStore from "../../store/store"


const Finish = () => {
    const { resetState } = useCountStore()
    useEffect(() => {
        useCountStore.setState({})
        resetState
        useCountStore.setState({count: 1})
        useCountStore.setState({
            count: 1,
            // increment: () => set((state) => ({ count: state.count + 1 })),
            // decrement: () => set((state) => ({ count: state.count - 1 })),
            complete: false,
            // toggleComplete: () => set((state) => ({ complete: !state.complete })),
            chronicCondition: [],

            dietaryPreference: [],
            physicalActivity: [],
            sleepPatterns: [],
            tobaccoProducts: [],

            visitDoctor: [],
            bloodSugarPressure: [],
            recentLabTests: [],
            previousSurgeriesorHospitalizations: [],

            underliningcondition: [],
            currentlyManagingAnyoFtheseConditions: [],

            nyKnownAllergicReactionsToTheseMedications: [],
            adhereToTheseMedications: [],
            barriersPreventingTreatmentPlan: [],
            ifYesWhatAreTheseBarriers: [],
            membersOrCaregiversInvolvedInYourCare: [],
            carryingOutTheseActivities: [],
            natureOfThePain: [],
            natureOFYourMobility: [],
            historyOfAnyChronicDiseases: [],
            experiencedAnySignificantChangesInYourFealthoRLifestyleRecently: [],
            doYouFeelPainWhenCarryingOutTheseActivities: [],
            whatIsTheNatureOfYourMobilityEnd: [],
            whatIsTheNatureOfThePain: [],
            form: {
                address: '',
                state: '',
                country: '',
                industry: '',
                employeeSize: '',
                fullName: '',
                lastName: '',
                role: '',
                email: '',
                date: '',
                others: '',
                phoneNumber: '',
                gender: '', // 'male', 'female' or '' for unselected
                othersHistor: '',
                othersMedicalHistory: '',
                contactInfoEmailnPhone: '',
                currentMedications: '',
                IfYesStateTheAllergies: '',
                othersBarriers: '',
                whatTypeAndFrequency: '',
                painFelt: '',
                engageInRegularPhysicalActivity: '',
                whereIsThisPainFelt: '',
            }
        }, true);
        // window.location.reload()
    }, [])

    return (
        <div className="flex flex-col items-center justify- max-w-md mx-auto h-screen w-screen">
            <div className="mb-20">
                <img src="logo.svg" className="h-8 my-5" alt="" />
            </div>
            <div className="flex flex-col mx-3 bg-white py-10">
                <img src="doctor2.svg" alt="doctor" className="h-64 mb-6" />

                <div className="flex text-2xl text-[#002355] leading-6 font-bold text-center mb-2">Thank you for taking out time to answer this questions.</div>
                <div className="text-sm text-[#444444] leading-6 my-2 text-center">You deserve the best care. Don’t hesitate to get in touch. You deserve the best care.</div>
            </div>
        </div>
    )
}

export default Finish