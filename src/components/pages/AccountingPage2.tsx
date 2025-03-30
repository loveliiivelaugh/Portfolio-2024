// import React from 'react';
// import { queries } from '@api/index';
// import { useQuery } from '@tanstack/react-query';
// import { useUtilityStore } from '@stores/index';
// import ChartsContainer from '@custom/charts/ChartsContainer';
// import { UtilityStoreType } from '@store/utilityStore';

// const table = 'accounting_services';

// const AccountingPage: React.FC = () => {
//     const setModal = useUtilityStore((s: UtilityStoreType) => s.setModal);
//     const setAlert = useUtilityStore((s) => s.setAlert);

//     const { data, isLoading } = useQuery(
//         queries.supabaseQuery({ table })
//     );

//     const rows = data?.data || [];
//     const columns = [
//         { field: 'name', headerName: 'Service', flex: 1 },
//         { field: 'description', headerName: 'Description', flex: 2 },
//         { field: 'category', headerName: 'Category', flex: 1 },
//         {
//             field: 'monthly_cost',
//             headerName: 'Monthly Cost',
//             flex: 1,
//             valueFormatter: ({ value }: { value: number }) => `$${value.toFixed(2)}`,
//         },
//     ];

//     return (
//         <ChartsContainer
//             charts={{
//                 table: {
//                     title: 'Accounting Overview',
//                     rows,
//                     columns,
//                 },
//             }}
//             operateButtons={{
//                 handleCreate: () =>
//                     setModal({
//                         open: true,
//                         title: 'Add Service',
//                         content: 'TODO: Show FormContainer here.',
//                     }),
//                 handleDelete: () =>
//                     setAlert({
//                         severity: 'warning',
//                         message: 'Select a service to delete.',
//                         open: true,
//                     }),
//             }}
//         />
//     );
// };

// export default AccountingPage;
