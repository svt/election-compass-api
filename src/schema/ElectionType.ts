import builder from '../builder';

export const ElectionType = builder.enumType('ElectionType', {
  values: {
    NATIONAL: {
      value: 'national',
    },
    REGION: {
      value: 'region',
    },
    MUNICIPALITY: {
      value: 'municipality',
    },
  } as const,
});

