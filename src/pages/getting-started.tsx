import useCountStore from '@/store/store';
import GettingStartedForm from '@/components/dashboard/GettingStartedForm';
import Lifestyle from '@/components/lifestyle/Lifestyle';
import HealthCheckups from '@/components/HealthCheckups/HealthCheckups';
import MedicalHistory from '@/components/MedicalHistory/MedicalHistory';
import Sidebar from '@/components/stepper/Sidebar';
import { google } from 'googleapis';
import { GoogleSpreadsheet } from 'google-spreadsheet'
const {
  NEXT_PUBLIC_PRIVATE_KEY,
  NEXT_PUBLIC_CLIENT_EMAIL,
  NEXT_PUBLIC_SPREADSHEET_ID,
  NEXT_PUBLIC_KEY,
  NEXT_PUBLIC_SHEET_ID
} = process.env


 type Props = {
    token: string
 }

const GettingStarted = ({token}: Props) => {
  const count = useCountStore(state => state.count)
  // const error = useCountStore(state => state.error)
  const form = useCountStore(state => state.form)
  const chronicCondition = useCountStore.getState().chronicCondition

   const appendSpreadsheet = async () => {
    useCountStore.setState({loading: true})
    const doc = new GoogleSpreadsheet(`${process.env.NEXT_PUBLIC_SPREADSHEET_ID}`, { token: token });
    const dataOnject = {
      firstName: useCountStore.getState().form.firstName,
      lastName: useCountStore.getState().form.lastName,
      phoneNumber: useCountStore.getState().form.phoneNumber,
      date: useCountStore.getState().form.date,
      gender: useCountStore.getState().form.gender,
      address: useCountStore.getState().form.address,
      othersHistory: useCountStore.getState().form.othersHistor,
      othersMedicalHistory: useCountStore.getState().form.othersMedicalHistory[0],
      contactInfoEmailnPhone: useCountStore.getState().form.contactInfoEmailnPhone,
      currentMedications: useCountStore.getState().form.currentMedications[0],
      IfYesStateTheAllergies: useCountStore.getState().form.IfYesStateTheAllergies[0],
      othersBarriers: useCountStore.getState().form.othersBarriers,
      whatTypeAndFrequency: useCountStore.getState().form.whatTypeAndFrequency[0],
      painFelt: useCountStore.getState().form.painFelt[0],
      engageInRegularPhysicalActivity: useCountStore.getState().form.engageInRegularPhysicalActivity[0],
      whereIsThisPainFelt: useCountStore.getState().form.whereIsThisPainFelt[0],

      chronicCondition: useCountStore.getState().chronicCondition[0],
      natureOfYourPhysicalActivity: useCountStore.getState().physicalActivity[0],
      bloodSugarPressure: useCountStore.getState().bloodSugarPressure[0],
      visitDoctor: useCountStore.getState().visitDoctor[0],
      sleepPatterns: useCountStore.getState().sleepPatterns[0],
      dietary: useCountStore.getState().dietaryPreference[0],
      tobaccoProducts: useCountStore.getState().tobaccoProducts[0],
      recentLabTests: useCountStore.getState().recentLabTests[0],
      previousSurgeriesorHospitalizations: useCountStore.getState().previousSurgeriesorHospitalizations[0],
      underliningcondition: useCountStore.getState().underliningcondition[0],
      currentlyManagingAnyoFtheseConditions: useCountStore.getState().currentlyManagingAnyoFtheseConditions[0],
    }
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsById[Number(process.env.NEXT_PUBLIC_SHEET_ID)];
      const result = await sheet.addRow(dataOnject);
      
      useCountStore.setState({loading: false})
      return result;
    } catch (e: any) {
      useCountStore.setState({error: String(e.message)})
      useCountStore.setState({loading: false})
      console.log(e, 'error loading')
    }
  };

  return (
    <div className="sm:mx-20 max-w-2x">
      <div className="flex justify-center h-screen">
        <Sidebar />
        <div className="flex flex-1 mx-10 my-4 md:my-8 w-full overflow-y-scroll no-scrollbar">
          {count === 1 && <GettingStartedForm  {...{appendSpreadsheet}} />}
          {count === 2 && <Lifestyle />}
          {count === 3 && <HealthCheckups />}
          {count === 4 && <MedicalHistory {...{appendSpreadsheet}} />}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

export async function getServerSideProps({}) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: NEXT_PUBLIC_PRIVATE_KEY,
      client_email: NEXT_PUBLIC_CLIENT_EMAIL
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const token = await auth.getAccessToken()
  // console.log(token, 'token')

  
  return {
    props: {
      token: token || '',
    }
  };
}