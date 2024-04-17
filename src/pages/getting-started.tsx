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
  error: string
}

const GettingStarted = ({ token, error }: Props) => {
  const count = useCountStore(state => state.count)
  // const error = useCountStore(state => state.error)
  const form = useCountStore(state => state.form)
  const chronicCondition = useCountStore.getState().chronicCondition
  const underliningcondition = useCountStore.getState().underliningcondition
  const dataOnject = {
    fullName: useCountStore.getState().form.fullName,
    email: useCountStore.getState().form.email,
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
    chronicCondition: chronicCondition.join(','),
    natureOfYourPhysicalActivity: useCountStore.getState().physicalActivity[0],
    bloodSugarPressure: useCountStore.getState().bloodSugarPressure[0],
    visitDoctor: useCountStore.getState().visitDoctor[0],
    sleepPatterns: useCountStore.getState().sleepPatterns[0],
    dietary: useCountStore.getState().dietaryPreference[0],
    tobaccoProducts: useCountStore.getState().tobaccoProducts[0],
    recentLabTests: useCountStore.getState().recentLabTests[0],
    previousSurgeriesorHospitalizations: useCountStore.getState().previousSurgeriesorHospitalizations[0],
    nonChronicMedicalUnderliningcondition: underliningcondition.join(','),
    currentlyManagingAnyoFtheseConditions: useCountStore.getState().currentlyManagingAnyoFtheseConditions[0],
  }

  const appendSpreadsheet = async () => {
    useCountStore.setState({ loading: true })
    const doc = new GoogleSpreadsheet(`${process.env.NEXT_PUBLIC_SPREADSHEET_ID}`, { token: token });
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsById[Number(process.env.NEXT_PUBLIC_SHEET_ID)];
      // await doc.updateProperties()
      await doc.updateProperties
      await doc._updateOrCreateSheet
      // useServiceAccountAuth({
      //   private_key: NEXT_PUBLIC_PRIVATE_KEY,
      //   client_email: NEXT_PUBLIC_CLIENT_EMAIL
      // });
      const result = await sheet.addRow(dataOnject);
      console.log(dataOnject,'dataOnject')

      useCountStore.setState({ loading: false })
      return result;
    } catch (e: any) {
      useCountStore.setState({ error: String(e.message) || '' })
      useCountStore.setState({ loading: false })
      // console.log(e, 'error loading')
    }
  };


  // Update Row in google spread sheet
  // async function updateSpreadsheet() {
  //   const auth = new google.auth.GoogleAuth({
  //     credentials: {
  //       client_email: NEXT_PUBLIC_CLIENT_EMAIL,
  //       private_key: NEXT_PUBLIC_PRIVATE_KEY,
  //     },
  //     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  //   });

  //   // const sheets = google.sheets({ version: 'v4', auth });

  //   // Load the Google Spreadsheet using the google-spreadsheet library
  //   const doc = new GoogleSpreadsheet(`${process.env.NEXT_PUBLIC_SPREADSHEET_ID}`, {token});

  //   // await doc.useServiceAccountAuth({
  //   //   client_email: NEXT_PUBLIC_CLIENT_EMAIL,
  //   //   private_key: NEXT_PUBLIC_PRIVATE_KEY,
  //   // });
  //   await doc.loadInfo();

  //   // Access the specific sheet by its ID
  //   const sheet = doc.sheetsById[Number(NEXT_PUBLIC_SHEET_ID)];

  //   // Update rows
  //   const rowsToUpdate = [
  //     { index: 0, values: ['Updated Value 1', 'Updated Value 2'] },
  //     { index: 1, values: ['Updated Value 3', 'Updated Value 4'] },
  //     // Add more rows to update as needed
  //   ];

  //   for (const row of rowsToUpdate) {
  //     await sheet.loadCells(`A${row.index + 1}:B${row.index + 1}`);
  //     const cell1 = sheet.getCell(row.index, 0);
  //     const cell2 = sheet.getCell(row.index, 1);

  //     cell1.value = row.values[0];
  //     cell2.value = row.values[1];

  //     await sheet.saveUpdatedCells();
  //   }

  //   console.log('Rows updated successfully.');
  // }

  // // Call the function to update the spreadsheet
  // updateSpreadsheet();

  return (
    <div className="sm:mx-20 max-w-2x">
      {error ? <div className="">
        {error}
      </div> : (
        <div className="flex justify-center h-screen">
          {!token ? <div className="flex items-center justify-center text-3xl text-white bg-[#1C1C1C] h-screen">Loading ...</div> : (
            <>
              <Sidebar />
              <div className="flex flex-1 mx-10 my-4 md:my-8 w-full overflow-y-scroll no-scrollbar">
                {count === 1 && <GettingStartedForm  {...{ appendSpreadsheet }} />}
                {count === 2 && <Lifestyle />}
                {count === 3 && <HealthCheckups />}
                {count === 4 && <MedicalHistory {...{ appendSpreadsheet }} />}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GettingStarted;

export async function getServerSideProps({ }) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: `${NEXT_PUBLIC_PRIVATE_KEY}`.replace(/\\n/gm, "\n"),
      client_email: NEXT_PUBLIC_CLIENT_EMAIL
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  console.log({
    credentials: {
      private_key: `${NEXT_PUBLIC_PRIVATE_KEY}`.replace(/\\n/gm, "\n"),
      client_email: NEXT_PUBLIC_CLIENT_EMAIL
    }
  })

  let error = ''
  const token = await auth.getAccessToken().catch(err => {
    // console.log(err);
    // error = String(err.message)
  })

  return {
    props: {
      token: token || '',
      error
    }
  };
}
