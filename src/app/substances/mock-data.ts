// tslint:disable: max-line-length
export const mockSubstancesData = [
  {
      Id: 52130,
      Description: 'Vitamin C is a 6-carbon hydroxy-lactone that is structurally related to glucose. It is a micronutrient essential to humans, primates and guinea pigs, but which is synthesised by other mammalian species from glucose and galactose. Vitamin C is highly water soluble, and in solution can be oxidised by atmospheric oxygen to give an equilibrium mixture of ascorbic and dehydroascorbic acids.',
      ExternalId: 7,
      ExternalUrl: 'https://en.wikipedia.org/wiki/Vitamin_C',
      Name: 'Ascorbic acid',
      Type: 7,
      MasterExternalId: 3,
      Synonyms: ['Vitamin C', '3-oxo-L-gulofuranolactone', 'L-threo-hex-2-enonic acid', 'E300', 'L-ascorbic acid'],
      Studies: [
          {
              Id: 44043,
              Consumers: 'Adults',
              ExternalUrl: 'http://dx.doi.org/10.2903/j.efsa.2013.3144',
              IsCarcinogenic: 'Negative',
              IsGenotoxic: 'Ambiguous',
              IsMutagenic: 'Positive',
              Remarks: 'A report published in 1978 by the SCF endorsed the group acceptable daily intake (ADI) of 20 mg/kg bw/day as established by JECFA of sodium stearoyl-2-lactylate and calcium stearoyl-2-lactylate.',
              RiskInFullText: 'Milligrams per kilogram body weight per day',
              RiskUnit: 'mg/kg bw/day',
              RiskValue: 20,
              SafetyFactor: 50,
              SubstanceId: 48647
          }
      ]
  },
  {
    Id: 52131,
    Description: 'Vitamin C is a 6-carbon hydroxy-lactone that is structurally related to glucose. It is a micronutrient essential to humans, primates and guinea pigs, but which is synthesised by other mammalian species from glucose and galactose. Vitamin C is highly water soluble, and in solution can be oxidised by atmospheric oxygen to give an equilibrium mixture of ascorbic and dehydroascorbic acids.',
    ExternalId: 7,
    ExternalUrl: 'https://en.wikipedia.org/wiki/Vitamin_C',
    Name: 'Ascorbic acid',
    Type: 7,
    MasterExternalId: 3,
    Synonyms: ['Vitamin C', '3-oxo-L-gulofuranolactone', 'L-threo-hex-2-enonic acid', 'E300', 'L-ascorbic acid'],
    Studies: [
        {
            Id: 44043,
            Consumers: 'Adults',
            ExternalUrl: 'http://dx.doi.org/10.2903/j.efsa.2013.3144',
            IsCarcinogenic: 'Negative',
            IsGenotoxic: 'Ambiguous',
            IsMutagenic: 'Positive',
            Remarks: 'A report published in 1978 by the SCF endorsed the group acceptable daily intake (ADI) of 20 mg/kg bw/day as established by JECFA of sodium stearoyl-2-lactylate and calcium stearoyl-2-lactylate.',
            RiskInFullText: 'Milligrams per kilogram body weight per day',
            RiskUnit: 'mg/kg bw/day',
            RiskValue: 20,
            SafetyFactor: 50,
            SubstanceId: 48647
        }
    ]
  }
];

export const mockGoogleVisionData = {
  responses: [
    {
      fullTextAnnotation: {
        text: 'Test testatas asdas da'
      }
    }
  ]
};
