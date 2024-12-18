import { GST } from '@/types/gst';

export const gstRates: GST[] = [
  {
    id: 1,
    name: 'Standard GST',
    code: 'GST-18',
    rate: 18,
    type: 'Goods',
    hsn_sac: '998391',
    description: 'Standard rate for most goods',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Reduced Rate',
    code: 'GST-12',
    rate: 12,
    type: 'Services',
    hsn_sac: '998392',
    description: 'Reduced rate for specific services',
    status: 'Active',
  },
];

export function filterGST(gstRates: GST[], filters: { search: string; status: string; type: string }): GST[] {
  return gstRates.filter((gst) => {
    const matchesSearch = !filters.search || 
      gst.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      gst.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      gst.hsn_sac.includes(filters.search);
    
    const matchesStatus = filters.status === 'all' || gst.status === filters.status;
    const matchesType = filters.type === 'all' || gst.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesType;
  });
}

export function addGST(gst: Partial<GST>): GST {
  const newGST: GST = {
    id: Math.max(...gstRates.map(g => g.id)) + 1,
    name: gst.name!,
    code: gst.code!,
    rate: gst.rate!,
    type: gst.type!,
    hsn_sac: gst.hsn_sac!,
    description: gst.description!,
    status: gst.status!,
  };
  gstRates.push(newGST);
  return newGST;
}

export function updateGST(id: number, gstData: Partial<GST>): GST {
  const index = gstRates.findIndex(g => g.id === id);
  if (index === -1) throw new Error('GST rate not found');
  
  gstRates[index] = { ...gstRates[index], ...gstData };
  return gstRates[index];
}

export function deleteGST(id: number): void {
  const index = gstRates.findIndex(g => g.id === id);
  if (index === -1) throw new Error('GST rate not found');
  
  gstRates.splice(index, 1);
}