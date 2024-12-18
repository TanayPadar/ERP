import { useState } from 'react';

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

interface PaginationActions {
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;
}

export function usePagination(initialPage = 1, initialPageSize = 10): [PaginationState, PaginationActions] {
  const [state, setState] = useState<PaginationState>({
    page: initialPage,
    pageSize: initialPageSize,
    total: 0
  });

  const totalPages = Math.ceil(state.total / state.pageSize);

  const actions: PaginationActions = {
    nextPage: () => {
      if (state.page < totalPages) {
        setState(prev => ({ ...prev, page: prev.page + 1 }));
      }
    },
    prevPage: () => {
      if (state.page > 1) {
        setState(prev => ({ ...prev, page: prev.page - 1 }));
      }
    },
    setPage: (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setState(prev => ({ ...prev, page }));
      }
    },
    setPageSize: (pageSize: number) => {
      setState(prev => ({ ...prev, pageSize, page: 1 }));
    },
    setTotal: (total: number) => {
      setState(prev => ({ ...prev, total }));
    }
  };

  return [state, actions];
}