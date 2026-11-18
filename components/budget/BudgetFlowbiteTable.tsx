// components/BudgetFlowbiteTable.tsx
"use client";

import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";

export default function BudgetFlowbiteTable({ rawRows }: { rawRows: any[] }) {
    console.log('raw', rawRows)
  return (
    <div className="overflow-x-auto" style={{ display: 'block', width: '100%', overflowX: 'auto', minHeight: '100px' }}>
      {/* Base table element remains */}
      <Table hoverable striped>
        {/* Changed from <Table.Head> */}
        <TableHead>
            <TableRow>
          {/* Changed from <Table.HeadCell> */}
          <TableHeadCell>Budget ID</TableHeadCell>
          <TableHeadCell>Starting Balance</TableHeadCell>
          <TableHeadCell>Ending Balance</TableHeadCell>
          </TableRow>
        </TableHead>
        
        {/* Changed from <Table.Body> */}
        <TableBody className="divide-y">
  {rawRows.map((row, index) => {
    // 💡 Add this exact debug block
    console.log("Rendering Row object data:", row);
    
    return (
      <TableRow key={row.id || index} className="bg-white">
        <TableCell className="font-medium text-gray-900">
          {row.budget_id || "No ID Property"}
        </TableCell>
        {/* If Postgres returned lower_case columns, fallback values prevent total blanking */}
        <TableCell>${row.startBalance || row.start_balance || 0}</TableCell>
        <TableCell>${row.endBalance || row.end_balance || 0}</TableCell>
      </TableRow>

      
    );
  })}
</TableBody>
      </Table>
      
    </div>
  );
}

