'use client';

import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function PaginationControls({ totalPages, currentPage, onPageChange }: PaginationControlsProps) {
    return (
        <div className="flex items-center justify-center space-x-4 mt-8">
            <Button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage <= 1}
                className='btn-primary-glow disabled:opacity-50 disabled:cursor-not-allowed'
            >
                <ChevronLeft className="-ml-1 mr-2 h-5 w-5"/>
                Previous
            </Button>
            <span className='text-lg font-semibold'>
                {currentPage} / {totalPages}
            </span>
            <Button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage >= totalPages}
                className='btn-primary-glow disabled:opacity-50 disabled:cursor-not-allowed'
            >
                Next
                <ChevronRight className="ml-2 -mr-1 h-5 w-5"/>
            </Button>
        </div>
    );
}
