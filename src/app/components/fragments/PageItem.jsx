import { PaginationItem, PaginationLink } from '@/components/ui/pagination';

export const PageItem = ({ currentPage, activePage }) => {
  return (
    <PaginationItem>
      <PaginationLink
        href={`?page=${currentPage}`}
        isActive={currentPage === activePage}
        className={currentPage === activePage ? 'bg-blue-500 text-white' : ''}
      >
        {currentPage}
      </PaginationLink>
    </PaginationItem>
  );
};
