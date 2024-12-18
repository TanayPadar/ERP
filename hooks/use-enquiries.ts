'use client';

import { useState, useEffect } from 'react';

export function useEnquiries() {
  // TODO: Replace with actual API call
  return {
    enquiries: [],
    isLoading: false,
    error: null,
  };
}