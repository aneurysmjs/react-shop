import type { Metadata } from 'next';

export interface GenerateMetadataProps {
  params: {
    locale: string;
  };
}

export type GenerateMetadata = (params: GenerateMetadataProps) => Promise<Metadata>;
