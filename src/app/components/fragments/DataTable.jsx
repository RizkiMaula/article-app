import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DataTable({ columns, data, showThumbnail = false }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showThumbnail && <TableHead className="w-[100px]">Thumbnail</TableHead>}
          {columns.map((column) => (
            <TableHead key={column.key}>{column.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {showThumbnail && (
              <TableCell>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={`${item.id}-${column.key}`}>{column.render ? column.render(item) : item[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
