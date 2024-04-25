import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
function Table() {
  return (
    <Table>
  <TableCaption>A list of Grievances</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">id</TableHead>
      <TableHead>Zone No</TableHead>
      <TableHead>Zone Name</TableHead>
      <TableHead>Ward</TableHead>
      <TableHead>Prediction</TableHead>
      <TableHead>Image</TableHead>
      <TableHead>Description</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>13</TableCell>
      <TableCell>Guindy</TableCell>
      <TableCell>126</TableCell>
      <TableCell>Road</TableCell>
      <TableCell>img.jpg</TableCell>
      <TableCell>Road damage</TableCell>
    </TableRow>
  </TableBody>
</Table>

  )
}

export default Table