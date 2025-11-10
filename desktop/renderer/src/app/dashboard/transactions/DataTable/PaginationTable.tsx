"use client"

import React,{ useState, useEffect } from "react";
import { Button } from '@/components/ui/button'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import { CaretRightIcon,CaretLeftIcon } from "@radix-ui/react-icons";

interface PaginationProps {
    table:any;
};

const PaginationTable = ({table}:PaginationProps) => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    const setCurrentPage = (pageNumber: number) => table.setPageIndex(pageNumber - 1)
    
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
  
    const paginate = (pageNumber:number,e?: React.MouseEvent) => {
        e?.preventDefault();
        setCurrentPage(pageNumber);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const pagesToShow = 3;

        let startPage = Math.max(1, currentPage - pagesToShow);
        let endPage = Math.min(totalPages, currentPage + pagesToShow);
    
        if (currentPage <= pagesToShow) {
          endPage = Math.min(totalPages, 2 * pagesToShow + 1);
        } else if (currentPage >= totalPages - pagesToShow) {
          startPage = Math.max(1, totalPages - 2 * pagesToShow);
        }
        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem key={1}>
                    <Button
                        variant='secondary'
                        size="sm"
                        onClick={(e) => paginate(1, e)}
                    >
                        {1}
                    </Button>
                </PaginationItem>
            );
            if (startPage > 2) {
                pageNumbers.push(
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            const isCurrent = i === currentPage;
            pageNumbers.push(
                <PaginationItem key={i}>
                    <Button
                        variant={isCurrent ? 'default' : 'secondary'}
                        size="sm"
                        onClick={(e) => paginate(i, e)}
                    >
                        {i}
                    </Button>
                </PaginationItem>
            );
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            pageNumbers.push(
                <PaginationItem key={totalPages}>
                    <Button
                        variant='secondary'
                        size="sm"
                        onClick={(e) => paginate(totalPages, e)}
                    >
                        {totalPages}
                    </Button>
                </PaginationItem>
            );
        }
        return pageNumbers;
    }
  
    
    return (
        <div className="flex items-center justify-between space-x-2 py-4">
            <Button
                variant="secondary"
                onClick={(e)=>paginate((currentPage-1),e)}
                disabled={isFirstPage}
            >
                <span><CaretLeftIcon/></span>
                <p className="hidden md:block">Préc</p>
            </Button>

            <Pagination>
                <PaginationContent>
                    {renderPageNumbers()}        
                </PaginationContent>
            </Pagination>
            
            <Button
                variant="secondary"
                onClick={(e)=>paginate((currentPage+1),e)}
                disabled={isLastPage}
            >
                <p className="hidden md:block">Suiv</p>
                <span> <CaretRightIcon/> </span>
            </Button>
        </div>
    );
};

export default PaginationTable;