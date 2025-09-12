export interface HardwareData {
    id: number;
    productLine: string;
    topic: string;
    title: string;
    summary: string;
    content: string;
    link: string;
    source: string;
    publishedAt: string;  // Using string for ISO date-time
    fetchedAt: string;    // Using string for ISO date-time
  }