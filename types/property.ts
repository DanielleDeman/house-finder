export interface propertyOfferTyping {
  status: string;
  lastModifiedAt: string;
  salePrice: number | null;
  rentalPrice: number | null;
}

export interface propertyTyping {
  type: string;
  id: number;
  attributes: {
    street: string;
    houseNumber: number;
    houseNumberExt: string;
    houseNumberFull: string;
    postcode: string;
    city: string;
    municipality: string;
    province: string;
    latitude: number;
    longitude: number;
    cbsNeighbourhoodId: number;
    cbsDistrictId: number;
    useSurface: number | null;
    plotSize: number | null;
    volume: number | null;
    buildYear: number | null;
    houseType: string;
    houseSubType: string;
    energyLabel: string;
    huispediaProfileUrl: string;
    kadasterData: {
      bagNumberDesignationId: string;
      bagBuildingId: string;
      bagObjectId: string;
    };
    image: {
      href: string;
    };
    offer: propertyOfferTyping;
  };
  links: {
    self: string;
    related: string;
  };
}

export interface propertyMarkerTyping {
  lat: number;
  lng: number;
  name: string;
}
