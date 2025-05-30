'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export const Paginate = ({ prevLink, nextLink, pageNumbers, page, totalPages }) => {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Tombol Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={prevLink}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>

        {/* Nomor Halaman */}
        {pageNumbers}

        {/* Tombol Next */}
        <PaginationItem>
          <PaginationNext
            href={nextLink}
            aria-disabled={page >= totalPages}
            className={page >= totalPages ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
