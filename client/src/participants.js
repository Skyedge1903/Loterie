import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'address', headerName: 'Address', width: 700 },
  { field: 'amount', headerName: 'Amount (Eth)', width: 300 },
];

export default function Participants({ data, web3 }) {

  const toEth = (wei) => {
    return web3.utils.fromWei(wei, "ether")
  }

  const rows = data.addrs.map((addr, i) => {
    return { id: i, address: addr, amount: toEth(data.amounts[i])}
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
